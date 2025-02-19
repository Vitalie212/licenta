using System.ComponentModel.DataAnnotations;

namespace TireStoreApi.Models
{
    public class Tire
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public required string Brand { get; set; }  // ✅ Adăugat required

        [Required]
        [StringLength(100)]
        public required string Model { get; set; }  // ✅ Adăugat required

        [Required]
        [StringLength(20)]
        public required string Size { get; set; }  // ✅ Adăugat required

        [Required]
        public float Price { get; set; }
    }
}
