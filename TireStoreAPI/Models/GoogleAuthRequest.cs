using System.ComponentModel.DataAnnotations;

namespace TireStoreApi.Models
{
    public class GoogleAuthRequest
    {
        [Required]
        public required string Email { get; set; }

        [Required]
        public required string FullName { get; set; }
    }
}