using Microsoft.EntityFrameworkCore;
using TexoIt.Movies.Data;
using TexoIt.Movies.DTOs;

namespace TexoIt.Movies.Services
{
    public class MoviesService : IMoviesService
    {
        private readonly IMoviesRepository _repository;

        public MoviesService(IMoviesRepository repository)
        {
            _repository = repository;
        }

        public async Task<MoviesWinIntervalsDTO> GetMoviesWinIntervals()
        {
            var query = (await _repository.GetMovies()
                .Where(m => m.Winner)
                .ToListAsync())
                .OrderBy(m => m.Year)
                .SelectMany(m => m.Producer.Replace(" and ", ", ").Split(',', StringSplitOptions.RemoveEmptyEntries).Select(p => new { Producer = p.Trim(), m.Year}))
                .GroupBy(m => m.Producer)
                .Select(m => new
                {
                    Producer = m.Key,
                    Years = m.Select(m => m.Year).ToList()
                })
                .ToList(); 
            // Unfortunately, making a linq query that can be translated to SQL script values without loading data to memory was not possible.
            // It might've been possible to do this using raw SQL scripts directly on the database, but covering any security concerns raised by that would further 
            // increase this solution's complexity to a point I judged to be unnecessary for the purpose of this text. This is to acknowledge that I am aware that this isn't the optimal way to do this


            var minQuery = query.Select(m => new
            {
                m.Producer,
                IntervalInfo = m.Years.Skip(1).Select((y, i) => new { Interval = y != m.Years[i] ? y - m.Years[i] : int.MaxValue, PreviousWin = m.Years[i], FollowingWin = y })
                .OrderBy(g => g.Interval).FirstOrDefault() ?? new { Interval = int.MaxValue, PreviousWin = 0, FollowingWin = 0 }
            }).Select(g => new MovieIntervalDTO
            {
                Producer = g.Producer,
                Interval = g.IntervalInfo.Interval,
                PreviousWin = g.IntervalInfo.PreviousWin,
                FollowingWin = g.IntervalInfo.FollowingWin
            }).OrderBy(m => m.Interval);

            var maxQuery = query.Select(m => new
            {
                m.Producer,
                IntervalInfo = m.Years.Skip(1).Select((y, i) => new { Interval = y - m.Years[i], PreviousWin = m.Years[i], FollowingWin = y })
                .OrderByDescending(g => g.Interval).FirstOrDefault() ?? new { Interval = int.MinValue, PreviousWin = 0, FollowingWin = 0 }
            }).Select(g => new MovieIntervalDTO
            {
                Producer = g.Producer,
                Interval = g.IntervalInfo.Interval,
                PreviousWin = g.IntervalInfo.PreviousWin,
                FollowingWin = g.IntervalInfo.FollowingWin
            }).OrderByDescending(m => m.Interval);

            return new MoviesWinIntervalsDTO
            {
                Max = maxQuery.Where(m => m.Interval == maxQuery.Max(q => q.Interval)),
                Min = minQuery.Where(m => m.Interval == minQuery.Min(q => q.Interval))
            };
        }
    }
}
