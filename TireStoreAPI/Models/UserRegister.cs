using System.ComponentModel.DataAnnotations;

namespace TireStoreAPI.Models
{
    public class UserRegister
    {
        [Required]
        public string Username { get; set; } = string.Empty; // ✅ Inițializare corectă

        [Required]
        public string Password { get; set; } = string.Empty; // ✅ Inițializare corectă

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty; // ✅ Adăugată validare pentru email

        [Required]
        public string Role { get; set; } = "user"; // ✅ Setare implicită pentru rol

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow; // ✅ Timpul de creare
    }
}
