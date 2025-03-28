using System.ComponentModel.DataAnnotations;

namespace TireStoreApi.Models
{
    public class UserLogin
    {
        [Required(ErrorMessage = "Adresa de email este obligatorie.")]
        [EmailAddress(ErrorMessage = "Introduceți o adresă de email validă.")]
        public string Email { get; set; } = string.Empty; // ✅ Autentificare cu email

        [Required(ErrorMessage = "Parola este obligatorie.")]
        [MinLength(6, ErrorMessage = "Parola trebuie să aibă cel puțin 6 caractere.")]
        [DataType(DataType.Password)]
        public string Password { get; set; } = string.Empty; // ✅ Validare corectă
    }
}
