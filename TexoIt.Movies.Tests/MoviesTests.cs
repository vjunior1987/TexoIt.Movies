using TexoIt.Movies.Data;
using TexoIt.Movies.Data.Context;
using TexoIt.Movies.Data.Interface;
using TexoIt.Movies.DTOs;
using TexoIt.Movies.Services;

namespace TexoIt.Movies.Tests
{

    public class MoviesTests
    {
        // Arrange
        private List<Movie> moviesList = Utils.RetrieveFromFile();
        private IMoviesRepository _moviesRepository;
        private IMoviesService _moviesService;
        private IDbInitializer _dbInitializer;
        private MoviesDbContext _context;
        public MoviesTests()
        {
            _context = new MoviesDbContext();
            _dbInitializer = new DbInitializer();
            _dbInitializer.Initialize();
            _moviesRepository = new MoviesRepository(_context);
            _moviesService = new MoviesService(_moviesRepository);
        }

        [Fact]
        public async Task IntegrationTest_MoviesMustBeRetrievedWithMinimunInterval()
        {
            // Act
            var moviesWinInterval = await _moviesService.GetMoviesWinIntervals();
            // Assert
            Assert.NotEmpty(moviesWinInterval.Min);
        }

        [Fact]
        public async Task IntegrationTest_MoviesMustBeRetrievedWithMaximunInterval()
        {
            // Act
            var moviesWinInterval = await _moviesService.GetMoviesWinIntervals();
            // Assert
            Assert.NotEmpty(moviesWinInterval.Max);
        }

        [Fact]
        public async Task IntegrationTest_MoviesMustBeRetrievedCorrectAmountOfIntervalOnMin()
        {
            // Arrange
            var expected = producerWithMinInterval();
            // Act
            var moviesWinInterval = await _moviesService.GetMoviesWinIntervals();
            // Assert
            Assert.NotNull(moviesWinInterval.Min.FirstOrDefault(x => x.Interval == expected.Interval));
        }

        [Fact]
        public async Task IntegrationTest_MoviesMustBeRetrievedCorrectAmountOfIntervalOnMax()
        {
            // Arrange
            var expected = producerWithMaxInterval();
            // Act
            var moviesWinInterval = await _moviesService.GetMoviesWinIntervals();
            // Assert
            Assert.NotNull(moviesWinInterval.Max.FirstOrDefault(x => x.Interval == expected.Interval));
        }

        private MovieIntervalDTO producerWithMaxInterval()
        {
            return moviesList.Where(m => m.Winner)
                .OrderBy(m => m.Year)
                .SelectMany(m => m.Producer.Replace(" and ", ", ").Split(',', StringSplitOptions.RemoveEmptyEntries).Select(p => new { Producer = p.Trim(), m.Year }))
                .GroupBy(m => m.Producer)
                .Select(m => new
                {
                    Producer = m.Key,
                    Years = m.Select(m => m.Year).ToList()
                })
                .Select(m => new
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
                }).OrderByDescending(m => m.Interval).FirstOrDefault();
        }

        private MovieIntervalDTO producerWithMinInterval()
        {
            return moviesList.Where(m => m.Winner)
                .OrderBy(m => m.Year)
                .SelectMany(m => m.Producer.Replace(" and ", ", ").Split(',', StringSplitOptions.RemoveEmptyEntries).Select(p => new { Producer = p.Trim(), m.Year }))
                .GroupBy(m => m.Producer)
                .Select(m => new
                {
                    Producer = m.Key,
                    Years = m.Select(m => m.Year).ToList()
                })
                .Select(m => new
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
                }).OrderBy(m => m.Interval).FirstOrDefault();
        }
    }
}