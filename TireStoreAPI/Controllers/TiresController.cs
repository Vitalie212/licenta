using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TireStoreApi.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TireStoreApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TiresController : ControllerBase
    {
        private readonly TireStoreContext _context;

        // Constructor pentru injectarea contextului bazei de date
        public TiresController(TireStoreContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Obține toate anvelopele din baza de date sau le filtrează după criterii.
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tire>>> GetTires(
            [FromQuery] decimal? width,
            [FromQuery] decimal? height,
            [FromQuery] decimal? diameter,
            [FromQuery] string? brand,
            [FromQuery] decimal? minPrice,
            [FromQuery] decimal? maxPrice)
        {
            var query = _context.Tires.AsQueryable(); // Inițializăm interogarea pentru toate anvelopele

            // Aplicăm filtrele de căutare
            if (width.HasValue)
                query = query.Where(t => t.Width == width.Value);

            if (height.HasValue)
                query = query.Where(t => t.Height == height.Value);

            if (diameter.HasValue)
                query = query.Where(t => t.Diameter == diameter.Value);

            if (!string.IsNullOrEmpty(brand))
                query = query.Where(t => t.Brand.Contains(brand));

            if (minPrice.HasValue)
                query = query.Where(t => t.Price >= minPrice.Value);

            if (maxPrice.HasValue)
                query = query.Where(t => t.Price <= maxPrice.Value);

            var tiresFromDb = await query.ToListAsync(); // Executăm interogarea și obținem rezultatele

            // Dacă nu s-au găsit anvelope, returnăm un mesaj de eroare
            if (tiresFromDb.Count == 0)
                return NotFound(new { message = "Nu s-au găsit anvelope cu aceste criterii!" });

            return Ok(tiresFromDb); // Returnăm lista de anvelope
        }
    }
}
