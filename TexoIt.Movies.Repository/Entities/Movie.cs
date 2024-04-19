using System.ComponentModel.DataAnnotations;

namespace TexoIt.Movies.Data
{
    public class Movie
    {
        [Key]
        public Guid Id { get; set; }
        public int Year { get; set; }
        public string Title { get; set; }
        public string Studios { get; set; }
        public string Producer { get; set; }
        public bool Winner { get; set; }
    }
}
