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

        public TiresController(TireStoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tire>>> GetTires()
        {
            var tiresFromDb = await _context.Tires.ToListAsync(); // Extrage datele din baza de date SQL Server
            return Ok(tiresFromDb);
        }

        [HttpPost]
        public async Task<ActionResult<Tire>> AddTire(Tire tire)
        {
            _context.Tires.Add(tire);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTires), new { id = tire.Id }, tire);
        }
    }
}

