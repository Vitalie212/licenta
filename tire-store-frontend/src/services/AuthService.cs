using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using TireStoreApi.Models;

namespace TireStoreApi.Services
{
    public class AuthService
    {
        private readonly string _secretKey;

        public AuthService()
        {
            _secretKey = "YourSuperSecretKey"; // Asigură-te că folosești un secret mai sigur în producție
        }

        public string Authenticate(User user)
        {
            // Verifică utilizatorul (într-o aplicație reală, ar trebui să validezi cu o bază de date)
            if (user.Username == "admin" && user.Password == "password") // Exemplu de autentificare simplă
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_secretKey);

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new System.Security.Claims.ClaimsIdentity(new[]
                    {
                        new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.Name, user.Username)
                    }),
                    Expires = DateTime.UtcNow.AddHours(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);
            }
            else
            {
                return null; // Dacă utilizatorul nu este valid
            }
        }
    }
}
