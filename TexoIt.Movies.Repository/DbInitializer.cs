using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TexoIt.Movies.Data.Context;
using TexoIt.Movies.Data.Interface;

namespace TexoIt.Movies.Data
{
    public class DbInitializer : IDbInitializer
    {
        public void Initialize()
        {
            using (MoviesDbContext context = new MoviesDbContext())
            {
                if (!context.Movies.Any())
                {
                    using (var reader = new StreamReader(@"movielist (2) (2) (2) (1) (1) (1) (1).csv"))
                    {
                        while (!reader.EndOfStream)
                        {
                            // Process each row
                            string row = reader.ReadLine() ?? string.Empty;
                            if (row.Contains("year;title;studios;producers;winner")) { continue; }
                            string[] fields = row.Split(';');
                            context.Movies.Add(new Movie
                            {
                                Id = Guid.NewGuid(),
                                Year = Convert.ToInt32(fields[0]),
                                Title = fields[1],
                                Studios = fields[2],
                                Producer = fields[3],
                                Winner = fields.Length == 5
                            });
                        }
                        context.SaveChanges();
                    }
                }
            }
        }
    }
}
