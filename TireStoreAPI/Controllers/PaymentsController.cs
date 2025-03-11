using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Stripe;
using Stripe.Checkout;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TireStoreApi.Models;
using TireStoreAPI.Models;

namespace TireStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly string _stripeSecretKey;
        private readonly TireStoreContext _context; // ✅ Injectare DB context

        public PaymentsController(IConfiguration configuration, TireStoreContext context)
        {
            _stripeSecretKey = configuration["Stripe:SecretKey"]
                ?? throw new ArgumentNullException("Stripe SecretKey is missing.");

            StripeConfiguration.ApiKey = _stripeSecretKey;
            _context = context;
        }

        /// <summary>
        /// ✅ Creează o sesiune de checkout cu Stripe
        /// </summary>
        [HttpPost("create-checkout-session")]
        public async Task<IActionResult> CreateCheckoutSession([FromBody] List<CheckoutItem> cartItems)
        {
            try
            {
                if (cartItems == null || cartItems.Count == 0)
                    return BadRequest(new { message = "Coșul este gol. Adaugă produse înainte de a efectua plata." });

                var options = new SessionCreateOptions
                {
                    PaymentMethodTypes = new List<string> { "card" },
                    LineItems = new List<SessionLineItemOptions>(),
                    Mode = "payment",
                    SuccessUrl = "http://localhost:3000/success",
                    CancelUrl = "http://localhost:3000/cancel"
                };

                foreach (var item in cartItems)
                {
                    if (string.IsNullOrWhiteSpace(item.Name) || item.Price <= 0 || item.Quantity <= 0)
                        return BadRequest(new { message = "Datele produsului sunt invalide." });

                    options.LineItems.Add(new SessionLineItemOptions
                    {
                        PriceData = new SessionLineItemPriceDataOptions
                        {
                            Currency = "mdl",
                            UnitAmount = (long)(item.Price * 100),
                            ProductData = new SessionLineItemPriceDataProductDataOptions { Name = item.Name }
                        },
                        Quantity = item.Quantity
                    });
                }

                var service = new SessionService();
                Session session = await service.CreateAsync(options);

                return Ok(new { url = session.Url });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Eroare internă: " + ex.Message });
            }
        }

        /// <summary>
        /// ✅ Salvează o plată în baza de date după ce a fost procesată de Stripe
        /// </summary>
        [HttpPost("save-payment")]
        public async Task<IActionResult> SavePayment([FromBody] Payment payment)
        {
            try
            {
                if (payment == null || string.IsNullOrEmpty(payment.UserId) || string.IsNullOrEmpty(payment.StripeSessionId))
                    return BadRequest(new { message = "Datele plății sunt incomplete." });

                _context.Payments.Add(payment);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Plata a fost salvată cu succes!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Eroare la salvarea plății: " + ex.Message });
            }
        }

        /// <summary>
        /// ✅ Obține toate plățile din baza de date
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetPayments()
        {
            try
            {
                var payments = await _context.Payments.ToListAsync();
                return Ok(payments);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Eroare la preluarea plăților: " + ex.Message });
            }
        }

        /// <summary>
        /// ✅ Obține o plată după ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPaymentById(int id)
        {
            var payment = await _context.Payments.FindAsync(id);
            if (payment == null)
                return NotFound(new { message = $"Plata cu ID-ul {id} nu a fost găsită." });

            return Ok(payment);
        }

        /// <summary>
        /// ✅ Șterge o plată după ID
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePayment(int id)
        {
            var payment = await _context.Payments.FindAsync(id);
            if (payment == null)
                return NotFound(new { message = $"Plata cu ID-ul {id} nu a fost găsită." });

            _context.Payments.Remove(payment);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

    // ✅ Modele pentru request
    public class CheckoutItem
    {
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}
