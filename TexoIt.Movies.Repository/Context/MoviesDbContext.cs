using Microsoft.EntityFrameworkCore;

namespace TexoIt.Movies.Data.Context
{
    public class MoviesDbContext : DbContext
    {
        public DbSet<Movie> Movies { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase(databaseName: "MoviesDatabase");
        }
    }
}
