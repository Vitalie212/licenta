using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TireStoreApi.Models
{
    public class User
    {
        [Key]  // Setează câmpul drept cheie primară
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Auto-generare ID
        public int Id { get; set; }

        [Required]
        public string Username { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

        public string Role { get; set; } = "User";
    }
}
