namespace TexoIt.Movies.Data
{
    public class MoviesRepository : IMoviesRepository
    {
        private readonly Context.MoviesDbContext _context;
        public MoviesRepository(Context.MoviesDbContext context)
        {
            _context = context;
        }

        public IQueryable<Movie> GetMovies() => _context.Movies;
    }
}
