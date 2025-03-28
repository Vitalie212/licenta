using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TireStoreApi.Models
{
    public class Tire
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public required string Name { get; set; }  // 🔹 Numele anvelopei

        [Required]
        [StringLength(100)]
        public required string Brand { get; set; }  // 🔹 Marca anvelopei (Michelin, Goodyear etc.)

        [Required]
        [StringLength(100)]
        public required string Model { get; set; }  // 🔹 Modelul anvelopei

        [StringLength(500)]
        public string? Description { get; set; }  // 🔹 Descrierea anvelopei (opțională)

        [Required]
        [Column(TypeName = "decimal(18,2)")] // 🔹 Specificare precisă pentru a evita pierderea de date
        public decimal Width { get; set; }  // 🔹 Lățimea anvelopei (ex. 205 mm)

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Height { get; set; }  // 🔹 Înălțimea anvelopei (ex. 55%)

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Diameter { get; set; }  // 🔹 Diametrul anvelopei (ex. R16)

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }  // 🔹 Prețul anvelopei

        [Required]
        [StringLength(100)]
        public required string Category { get; set; }  // 🔹 Categoria (Autoturisme, SUV, Camioane, Agricole)

        [Required]
        public string Image { get; set; } = "default-tire.jpg";  // 🔹 Link către imagine (ex. `/images/tire1.jpg`)
    }
}
