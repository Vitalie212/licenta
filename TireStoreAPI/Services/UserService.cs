using Microsoft.EntityFrameworkCore;
using TireStoreApi.Models;

namespace TireStoreApi.Services
{
    public class UserService
    {
        private readonly TireStoreContext _context;

        public UserService(TireStoreContext context)
        {
            _context = context;
        }

        public async Task<bool> Register(User user)
        {
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Username == user.Username);
            if (existingUser != null)
                return false; // Utilizatorul există deja

            // Hashing parola (opțional, dar recomandat)
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<User?> GetUserByUsername(string username)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
        }
    }
}
