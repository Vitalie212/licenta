using Microsoft.AspNetCore.Mvc;
using TireStoreApi.Models;
using TireStoreApi.Services;

namespace TireStoreApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            var success = await _userService.Register(user);
            if (!success)
                return BadRequest(new { message = "Utilizatorul există deja." });

            return Ok(new { message = "Utilizator înregistrat cu succes." });
        }
    }
}
