using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using TireStoreApi.Models;

namespace TireStoreApi.Services
{
    public class AuthService
    {
        private readonly string _secretKey;
        private readonly List<User> _users = new()
    {
        new User { Username = "admin", Password = "admin123", Role = "Admin" },
        new User { Username = "user", Password = "user123", Role = "User" }
    };

        public AuthService(IConfiguration configuration)
        {
            _secretKey = configuration["JwtSettings:SecretKey"];

            if (string.IsNullOrEmpty(_secretKey) || _secretKey.Length < 32)
            {
                throw new ArgumentNullException(nameof(_secretKey), "Cheia JWT lipsește sau este prea scurtă. Trebuie să aibă cel puțin 32 de caractere.");
            }
        }
    


    public string Authenticate(string username, string password)
        {
            var existingUser = _users.FirstOrDefault(x => x.Username == username && x.Password == password);
            if (existingUser == null) return null;

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_secretKey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, existingUser.Username),
                    new Claim(ClaimTypes.Role, existingUser.Role) // Adaugă rolurile în token
                }),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
