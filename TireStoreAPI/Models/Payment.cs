using System;
using System.ComponentModel.DataAnnotations;

namespace TireStoreAPI.Models
{
    public class Payment
    {
        [Key]
        public int Id { get; set; } // 🔹 ID unic pentru plată

        [Required]
        public string UserId { get; set; } // 🔹 ID-ul utilizatorului care a făcut plata

        [Required]
        public string StripeSessionId { get; set; } // 🔹 ID-ul sesiunii Stripe pentru verificare

        [Required]
        public decimal Amount { get; set; } // 🔹 Suma totală a plății

        [Required]
        public DateTime PaymentDate { get; set; } = DateTime.UtcNow; // 🔹 Data plății

        [Required]
        public string Status { get; set; } // 🔹 Statusul plății (ex: "pending", "paid", "failed")
    }
}
