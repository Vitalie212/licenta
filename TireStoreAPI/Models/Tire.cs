using System.ComponentModel.DataAnnotations;

namespace TireStoreApi.Models
{
    public class Tire
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public required string Brand { get; set; }

        [Required]
        [StringLength(100)]
        public required string Model { get; set; }

        // Modificat de la float la decimal
        [Required]
        public decimal Width { get; set; }  // Aici schimbăm de la float la decimal

        // Modificat de la float la decimal
        [Required]
        public decimal Height { get; set; }  // Aici schimbăm de la float la decimal

        // Modificat de la float la decimal
        [Required]
        public decimal Diameter { get; set; }  // Aici schimbăm de la float la decimal

        [Required]
        public decimal Price { get; set; }
    }
}
