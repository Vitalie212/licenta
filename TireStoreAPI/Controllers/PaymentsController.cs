using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Stripe;
using Stripe.Checkout;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TireStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly string _stripeSecretKey;

        public PaymentsController(IConfiguration configuration)
        {
            _stripeSecretKey = configuration["Stripe:SecretKey"]
                ?? throw new ArgumentNullException("Stripe SecretKey is missing.");

            StripeConfiguration.ApiKey = _stripeSecretKey;
        }

        // ✅ Endpoint pentru crearea unei sesiuni de checkout cu Stripe
        [HttpPost("create-checkout-session")]
        public async Task<IActionResult> CreateCheckoutSession([FromBody] List<CheckoutItem> cartItems)
        {
            try
            {
                if (cartItems == null || cartItems.Count == 0)
                {
                    return BadRequest(new { message = "Coșul este gol. Adaugă produse înainte de a efectua plata." });
                }

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
                    {
                        return BadRequest(new { message = "Datele produsului sunt invalide." });
                    }

                    options.LineItems.Add(new SessionLineItemOptions
                    {
                        PriceData = new SessionLineItemPriceDataOptions
                        {
                            Currency = "mdl",
                            UnitAmount = (long)(item.Price * 100),
                            ProductData = new SessionLineItemPriceDataProductDataOptions
                            {
                                Name = item.Name
                            }
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

        // ✅ Endpoint pentru salvarea cardului utilizatorului
        [HttpPost("save-card")]
        public async Task<IActionResult> SaveCard([FromBody] SaveCardRequest request)
        {
            try
            {
                if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.PaymentMethodId))
                {
                    return BadRequest(new { message = "Email și PaymentMethodId sunt necesare." });
                }

                var customerService = new CustomerService();
                var customerList = await customerService.ListAsync(new CustomerListOptions { Email = request.Email });

                Customer customer;
                if (customerList.Data.Count > 0)
                {
                    customer = customerList.Data[0];
                }
                else
                {
                    var customerOptions = new CustomerCreateOptions
                    {
                        Email = request.Email,
                        PaymentMethod = request.PaymentMethodId,
                        InvoiceSettings = new CustomerInvoiceSettingsOptions
                        {
                            DefaultPaymentMethod = request.PaymentMethodId
                        }
                    };
                    customer = await customerService.CreateAsync(customerOptions);
                }

                return Ok(new { customerId = customer.Id });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Eroare la salvarea cardului: " + ex.Message });
            }
        }

        // ✅ Endpoint pentru verificarea cardurilor salvate ale unui utilizator
        [HttpGet("saved-cards/{customerId}")]
        public async Task<IActionResult> GetSavedCards(string customerId)
        {
            try
            {
                var paymentMethodService = new PaymentMethodService();
                var paymentMethods = await paymentMethodService.ListAsync(new PaymentMethodListOptions
                {
                    Customer = customerId,
                    Type = "card"
                });

                var cards = new List<object>();
                foreach (var method in paymentMethods)
                {
                    cards.Add(new
                    {
                        method.Id,
                        method.Card.Brand,
                        method.Card.Last4,
                        Expiry = $"{method.Card.ExpMonth}/{method.Card.ExpYear}"
                    });
                }

                return Ok(new { cards });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Eroare la preluarea cardurilor salvate: " + ex.Message });
            }
        }

        // ✅ Endpoint pentru plată cu un card salvat
        [HttpPost("charge-saved-card")]
        public async Task<IActionResult> ChargeSavedCard([FromBody] ChargeSavedCardRequest request)
        {
            try
            {
                if (string.IsNullOrEmpty(request.CustomerId) || string.IsNullOrEmpty(request.PaymentMethodId) || request.Amount <= 0)
                {
                    return BadRequest(new { message = "Datele trimise sunt invalide." });
                }

                var paymentIntentOptions = new PaymentIntentCreateOptions
                {
                    Amount = request.Amount * 100,
                    Currency = "mdl",
                    Customer = request.CustomerId,
                    PaymentMethod = request.PaymentMethodId,
                    Confirm = true,
                    ReturnUrl = "http://localhost:3000/success",
                    AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
                    {
                        Enabled = true,
                        AllowRedirects = "never"
                    }
                };

                var paymentIntentService = new PaymentIntentService();
                var paymentIntent = await paymentIntentService.CreateAsync(paymentIntentOptions);

                return Ok(new { message = "Plată efectuată cu succes", paymentIntentId = paymentIntent.Id });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Eroare la procesarea plății: " + ex.Message });
            }
        }
    }

    // ✅ Modele pentru request
    public class CheckoutItem
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }

    public class SaveCardRequest
    {
        public string Email { get; set; }
        public string PaymentMethodId { get; set; }
    }

    public class ChargeSavedCardRequest
    {
        public string CustomerId { get; set; }
        public string PaymentMethodId { get; set; }
        public int Amount { get; set; }
    }
}
