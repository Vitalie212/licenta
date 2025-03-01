using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using TireStoreApi.Models;
using Microsoft.EntityFrameworkCore;

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

        public async Task<string?> Authenticate(string username, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.Password))
                return null; // Utilizatorul nu există sau parola este incorectă

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_secretKey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.Username),
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
