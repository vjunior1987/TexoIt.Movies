namespace TexoIt.Movies.DTOs
{
    public class MoviesWinIntervalsDTO
    {
        public IEnumerable<MovieIntervalDTO> Min { get; set; } = new List<MovieIntervalDTO>();
        public IEnumerable<MovieIntervalDTO> Max { get; set; } = new List<MovieIntervalDTO>();
    }
}
