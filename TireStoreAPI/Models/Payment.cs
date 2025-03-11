using System;
using System.ComponentModel.DataAnnotations;

namespace TireStoreAPI.Models
{
    public class Payment
    {
        [Key]
        public int Id { get; set; } // 🔹 ID unic pentru plată

        [Required]
        [StringLength(50)]
        public string UserId { get; set; } = string.Empty; // 🔹 ID-ul utilizatorului care a făcut plata

        [Required]
        [StringLength(100)]
        public string StripeSessionId { get; set; } = string.Empty; // 🔹 ID-ul sesiunii Stripe pentru verificare

        [Required]
        public decimal Amount { get; set; } // 🔹 Suma totală a plății

        [Required]
        public DateTime PaymentDate { get; set; } = DateTime.UtcNow; // 🔹 Data plății

        [Required]
        [StringLength(20)]
        public string Status { get; set; } = "pending"; // 🔹 Statusul plății (ex: "pending", "paid", "failed")
    }
}
