using TexoIt.Movies.Data;

namespace TexoIt.Movies.Data
{
    public interface IMoviesRepository
    {
        IQueryable<Movie> GetMovies();
    }
}
