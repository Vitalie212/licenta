using Microsoft.AspNetCore.Mvc;
using TireStoreApi.Models;
using TireStoreApi.Services;

namespace TireStoreApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] UserLogin user)
        {
            if (string.IsNullOrEmpty(user.Username) || string.IsNullOrEmpty(user.Password))
                return BadRequest(new { message = "Email și parola sunt necesare." });

            var token = _authService.Authenticate(user.Username, user.Password);

            if (token == null)
                return Unauthorized(new { message = "Credențialele sunt incorecte." });
            return Ok(new { token });
        }
    }
}
