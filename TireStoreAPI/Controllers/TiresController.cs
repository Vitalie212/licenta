using Microsoft.AspNetCore.Mvc;
using TireStoreApi.Models;
using System.Collections.Generic;
using System.Linq;

namespace TireStoreApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TiresController : ControllerBase
    {
        private static List<Tire> tires = new List<Tire>
        {
            new Tire { Id = 1, Brand = "Michelin", Model = "Pilot Sport", Size = "205/55R16", Price = 150 },
            new Tire { Id = 2, Brand = "Goodyear", Model = "Eagle F1", Size = "225/45R17", Price = 180 }
        };

        [HttpGet]
        public ActionResult<IEnumerable<Tire>> GetTires()
        {
            return Ok(tires);
        }

        [HttpPost]
        public ActionResult AddTire(Tire tire)
        {
            tire.Id = tires.Count + 1;
            tires.Add(tire);
            return CreatedAtAction(nameof(GetTires), new { id = tire.Id }, tire);
        }
    }
}
