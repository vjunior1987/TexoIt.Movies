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
            const int expected = 1;
            // Act
            var moviesWinInterval = await _moviesService.GetMoviesWinIntervals();
            // Assert
            Assert.NotNull(moviesWinInterval.Min.FirstOrDefault(x => x.Interval == expected));
        }

        [Fact]
        public async Task IntegrationTest_MoviesMustBeRetrievedCorrectAmountOfIntervalOnMax()
        {
            // Arrange
            const int expected = 13;
            // Act
            var moviesWinInterval = await _moviesService.GetMoviesWinIntervals();
            // Assert
            Assert.NotNull(moviesWinInterval.Max.FirstOrDefault(x => x.Interval == expected));
        }

        private MovieIntervalDTO minMovie()
        {
            var producerInterval = moviesList.Where(m => m.Winner)
                .ToList()
                .SelectMany(m => m.Producer.Split(',').Select(p => new { Producer = p.Trim(), m.Year }))
                .GroupBy(m => m.Producer)
                .Select(g => new
                {
                    Producer = g.Key,
                    Movies = g.OrderBy(m => m.Year).ToList()
                })
                .Select(m => new
                {
                    m.Producer,
                    IntervalInfo = m.Movies.Skip(1).Zip(m.Movies, (a, b) => new { Interval = a.Year - b.Year, PreviousWin = b.Year, FollowingWin = a.Year }).OrderBy(x => x.Interval).FirstOrDefault()
                })
                .Where(m => m.IntervalInfo != null)
                .OrderBy(m => m.IntervalInfo?.Interval)
                .FirstOrDefault();
            return new MovieIntervalDTO
            {
                Producer = producerInterval.Producer,
                Interval = producerInterval.IntervalInfo.Interval,
                PreviousWin = producerInterval.IntervalInfo.PreviousWin,
                FollowingWin = producerInterval.IntervalInfo.FollowingWin
            };
        }
    }
}