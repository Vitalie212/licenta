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
            // 🔹 Loghează parametrii primiți pentru depanare
            Console.WriteLine($"Received Filters: Width={width}, Height={height}, Diameter={diameter}, Brand={brand}, MinPrice={minPrice}, MaxPrice={maxPrice}");

            var query = _context.Tires.AsQueryable(); // Inițializăm interogarea pentru toate anvelopele

            // Aplicăm filtrele de căutare
            if (width.HasValue)
            {
                Console.WriteLine($"Filtering by Width: {width.Value}");
                query = query.Where(t => t.Width == width.Value);
            }

            if (height.HasValue)
            {
                Console.WriteLine($"Filtering by Height: {height.Value}");
                query = query.Where(t => t.Height == height.Value);
            }

            if (diameter.HasValue)
            {
                Console.WriteLine($"Filtering by Diameter: {diameter.Value}");
                query = query.Where(t => t.Diameter == diameter.Value);
            }

            if (!string.IsNullOrEmpty(brand))
            {
                Console.WriteLine($"Filtering by Brand: {brand}");
                query = query.Where(t => t.Brand.Contains(brand));
            }

            if (minPrice.HasValue)
            {
                Console.WriteLine($"Filtering by MinPrice: {minPrice.Value}");
                query = query.Where(t => t.Price >= minPrice.Value);
            }

            if (maxPrice.HasValue)
            {
                Console.WriteLine($"Filtering by MaxPrice: {maxPrice.Value}");
                query = query.Where(t => t.Price <= maxPrice.Value);
            }

            var tiresFromDb = await query.ToListAsync(); // Executăm interogarea și obținem rezultatele

            // 🔹 Afișează numărul de anvelope găsite
            Console.WriteLine($"Found {tiresFromDb.Count} tires.");

            // Dacă nu s-au găsit anvelope, returnăm un mesaj de eroare
            if (tiresFromDb.Count == 0)
                return NotFound(new { message = "Nu s-au găsit anvelope cu aceste criterii!" });

            return Ok(tiresFromDb); // Returnăm lista de anvelope
        }
    }
}
