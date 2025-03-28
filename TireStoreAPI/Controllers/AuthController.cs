using Microsoft.AspNetCore.Mvc;
using TireStoreApi.Models;
using TireStoreApi.Services;
using System.Threading.Tasks;

namespace TireStoreApi.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegister user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = "Datele introduse nu sunt valide.", errors = ModelState });
            }

            // ✅ Asigură-te că email-ul NU este gol
            if (string.IsNullOrWhiteSpace(user.Email))
            {
                return BadRequest(new { message = "Adresa de email este obligatorie!" });
            }

            var result = await _authService.Register(user.FullName, user.Username, user.Email, user.Password);

            if (!result.Success)
                return BadRequest(new { message = result.Message });

            return Ok(new { message = result.Message, token = result.Token });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLogin user)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { message = "Datele introduse nu sunt valide.", errors = ModelState });

            var token = await _authService.Authenticate(user.Email, user.Password);

            if (token == null)
                return Unauthorized(new { message = "Credențialele sunt incorecte." });

            return Ok(new { token });
        }

        [HttpPost("google-login")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleAuthRequest googleUser)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { message = "Datele introduse nu sunt valide.", errors = ModelState });

            var result = await _authService.AuthenticateWithGoogle(googleUser.Email, googleUser.FullName);

            if (!result.Success)
                return BadRequest(new { message = "Eroare la autentificarea cu Google." });

            return Ok(new { token = result.Token });
        }
    }
}
