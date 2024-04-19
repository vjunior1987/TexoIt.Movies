namespace TexoIt.Movies.DTOs
{
    public class MoviesWinIntervalsDTO
    {
        public IEnumerable<MovieIntervalDTO> Min { get; set; }
        public IEnumerable<MovieIntervalDTO> Max { get; set; }
    }
}
