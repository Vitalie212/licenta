using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using TireStoreApi.Models;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;
using System.Threading.Tasks;

namespace TireStoreApi.Services
{
    public class AuthService
    {
        private readonly TireStoreContext _context;
        private readonly string _secretKey;

        public AuthService(TireStoreContext context, IConfiguration configuration)
        {
            _context = context;
            _secretKey = configuration["JwtSettings:SecretKey"] ?? throw new ArgumentNullException("JWT Secret Key missing.");
        }

        public async Task<(bool Success, string Message, string? Token)> Register(string fullName, string username, string email, string password)
        {
            try
            {
                if (await _context.Users.AnyAsync(u => u.Email == email || u.Username == username))
                {
                    return (false, "Username sau email deja utilizat!", null);
                }

                var newUser = new User
                {
                    FullName = fullName,
                    Username = username,
                    Email = email,
                    Password = BCrypt.Net.BCrypt.HashPassword(password),
                    Role = "User",
                    CreatedAt = DateTime.UtcNow
                };

                _context.Users.Add(newUser);
                await _context.SaveChangesAsync();

                var token = GenerateJwtToken(newUser);
                return (true, "Utilizator creat cu succes!", token);
            }
            catch (Exception ex)
            {
                return (false, $"Eroare la înregistrare: {ex.InnerException?.Message ?? ex.Message}", null);
            }
        }

        public async Task<string?> Authenticate(string email, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.Password))
                return null;

            return GenerateJwtToken(user);
        }

        public async Task<(bool Success, string? Token)> AuthenticateWithGoogle(string email, string fullName)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

                if (user == null)
                {
                    user = new User
                    {
                        FullName = fullName,
                        Username = email.Split('@')[0],
                        Email = email,
                        Password = BCrypt.Net.BCrypt.HashPassword(Guid.NewGuid().ToString()),
                        Role = "User",
                        CreatedAt = DateTime.UtcNow
                    };

                    _context.Users.Add(user);
                    await _context.SaveChangesAsync();
                }

                var token = GenerateJwtToken(user);
                return (true, token);
            }
            catch (Exception ex)
            {
                return (false, ex.Message);
            }
        }

        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_secretKey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
