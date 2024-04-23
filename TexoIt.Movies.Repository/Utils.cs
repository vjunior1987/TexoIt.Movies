using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TexoIt.Movies.Data
{
    public static class Utils
    {
        public static List<Movie> RetrieveFromFile(string path = @"movielist (2) (2) (2) (1) (1) (1) (1).csv")
        {
            var movies = new List<Movie>();
            using (var reader = new StreamReader(path))
            {
                while (!reader.EndOfStream)
                {
                    // Process each row
                    string row = reader.ReadLine() ?? string.Empty;
                    if (row.Contains("year;title;studios;producers;winner")) { continue; }
                    string[] fields = row.Split(';');
                    movies.Add(new Movie
                    {
                        Id = Guid.NewGuid(),
                        Year = Convert.ToInt32(fields[0]),
                        Title = fields[1],
                        Studios = fields[2],
                        Producer = fields[3],
                        Winner = fields.Length == 5 && fields[4].ToLower() == "yes"
                    });
                }
                return movies;
            }
        }
    }
}
