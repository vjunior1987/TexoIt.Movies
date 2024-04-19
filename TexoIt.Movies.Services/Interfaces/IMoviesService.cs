using TexoIt.Movies.DTOs;

namespace TexoIt.Movies.Services
{
    public interface IMoviesService
    {
        Task<MoviesWinIntervalsDTO> GetMoviesWinIntervals();
    }
}
