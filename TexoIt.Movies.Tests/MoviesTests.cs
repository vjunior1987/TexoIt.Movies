using TexoIt.Movies.Data;
using TexoIt.Movies.Data.Context;
using TexoIt.Movies.Data.Interface;
using TexoIt.Movies.Services;

namespace TexoIt.Movies.Tests
{
    public class MoviesTests
    {
        // Arrange
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
            const int expected = 9;
            // Act
            var moviesWinInterval = await _moviesService.GetMoviesWinIntervals();
            // Assert
            Assert.NotNull(moviesWinInterval.Max.FirstOrDefault(x => x.Interval == expected));
        }
    }
}