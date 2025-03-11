using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TireStoreApi.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;

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
            [FromQuery] decimal? maxPrice,
            [FromQuery] string? category)
        {
            try
            {
                Console.WriteLine($"[API] Fetching tires with filters - Category: {category}");

                var query = _context.Tires.AsNoTracking().AsQueryable();

                // Aplicăm filtrele de căutare
                if (width.HasValue) query = query.Where(t => t.Width == width.Value);
                if (height.HasValue) query = query.Where(t => t.Height == height.Value);
                if (diameter.HasValue) query = query.Where(t => t.Diameter == diameter.Value);
                if (!string.IsNullOrEmpty(brand)) query = query.Where(t => t.Brand.Contains(brand));
                if (minPrice.HasValue) query = query.Where(t => t.Price >= minPrice.Value);
                if (maxPrice.HasValue) query = query.Where(t => t.Price <= maxPrice.Value);
                if (!string.IsNullOrEmpty(category)) query = query.Where(t => t.Category.ToLower() == category.ToLower());

                // ✅ Adaugăm fallback pentru imagine
                var tires = await query
                    .Select(t => new
                    {
                        t.Id,
                        t.Name,
                        t.Brand,
                        t.Model,
                        t.Description,
                        t.Price,
                        t.Category,
                        Image = string.IsNullOrEmpty(t.Image) ? "default-tire.jpg" : t.Image // ✅ Asigură imagine implicită
                    })
                    .ToListAsync();

                Console.WriteLine($"[API] Found {tires.Count} tires.");

                if (!tires.Any())
                {
                    return NotFound(new { message = "Nu s-au găsit anvelope cu aceste criterii!" });
                }

                return Ok(tires);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[API ERROR] {ex.Message}");
                return StatusCode(500, new { message = "A apărut o eroare internă.", error = ex.Message });
            }
        }

        /// <summary>
        /// Obține o anvelopă după ID.
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<Tire>> GetTireById(int id)
        {
            Console.WriteLine($"[API] Fetching tire with ID: {id}");

            var tire = await _context.Tires.AsNoTracking()
                .Select(t => new
                {
                    t.Id,
                    t.Name,
                    t.Brand,
                    t.Model,
                    t.Description,
                    t.Price,
                    t.Category,
                    Image = string.IsNullOrEmpty(t.Image) ? "default-tire.jpg" : t.Image
                })
                .FirstOrDefaultAsync(t => t.Id == id);

            if (tire == null)
            {
                return NotFound(new { message = $"Anvelopa cu ID-ul {id} nu a fost găsită." });
            }

            return Ok(tire);
        }

        /// <summary>
        /// Adaugă o anvelopă nouă în baza de date.
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<Tire>> CreateTire([FromBody] Tire tire)
        {
            try
            {
                if (tire == null || string.IsNullOrEmpty(tire.Name) || string.IsNullOrEmpty(tire.Category))
                {
                    return BadRequest(new { message = "Datele anvelopei sunt invalide!" });
                }

                // ✅ Asigurăm că imaginea are un fallback
                tire.Image = string.IsNullOrEmpty(tire.Image) ? "default-tire.jpg" : tire.Image;

                _context.Tires.Add(tire);
                await _context.SaveChangesAsync();

                Console.WriteLine($"[API] Tire added: {tire.Name}");

                return CreatedAtAction(nameof(GetTireById), new { id = tire.Id }, tire);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[API ERROR] {ex.Message}");
                return StatusCode(500, new { message = "Eroare la adăugarea anvelopei.", error = ex.Message });
            }
        }

        /// <summary>
        /// Actualizează o anvelopă existentă.
        /// </summary>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTire(int id, [FromBody] Tire tire)
        {
            if (id != tire.Id)
            {
                return BadRequest(new { message = "ID-ul anvelopei nu corespunde!" });
            }

            var existingTire = await _context.Tires.FindAsync(id);
            if (existingTire == null)
            {
                return NotFound(new { message = $"Anvelopa cu ID-ul {id} nu a fost găsită." });
            }

            // ✅ Asigurăm că imaginea are un fallback
            tire.Image = string.IsNullOrEmpty(tire.Image) ? "default-tire.jpg" : tire.Image;

            _context.Entry(tire).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                Console.WriteLine($"[API] Tire updated: {tire.Name}");
                return NoContent();
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(500, new { message = "Eroare la actualizarea anvelopei." });
            }
        }

        /// <summary>
        /// Șterge o anvelopă după ID.
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTire(int id)
        {
            var tire = await _context.Tires.FindAsync(id);
            if (tire == null)
            {
                return NotFound(new { message = $"Anvelopa cu ID-ul {id} nu a fost găsită." });
            }

            _context.Tires.Remove(tire);
            await _context.SaveChangesAsync();

            Console.WriteLine($"[API] Tire deleted: {tire.Name}");

            return NoContent();
        }
    }
}
