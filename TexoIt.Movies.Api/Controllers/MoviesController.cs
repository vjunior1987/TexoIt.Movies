using Microsoft.AspNetCore.Mvc;
using TexoIt.Movies.Services;

namespace TexoIt.Movies.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MoviesController : ControllerBase
    {
        private readonly IMoviesService _service;

        public MoviesController(IMoviesService service)
        {
            _service = service;    
        }

        [HttpGet()]
        public async Task<IActionResult> GetMoviesWinIntervals()
        {
            return Ok(await _service.GetMoviesWinIntervals());
        }
    }
}
