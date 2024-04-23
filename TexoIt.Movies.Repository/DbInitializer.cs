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
                    var movies = Utils.RetrieveFromFile();
                    context.AddRange(movies);
                    context.SaveChanges();
                }
            }
        }
    }
}

