using System.ComponentModel.DataAnnotations;

namespace TireStoreApi.Models
{
    public class UserRegister
    {
        [Required(ErrorMessage = "Numele complet este obligatoriu.")]
        public string FullName { get; set; } = string.Empty;  // ✅ `FullName` este necesar

        [Required(ErrorMessage = "Username-ul este obligatoriu.")]
        [MinLength(3, ErrorMessage = "Username-ul trebuie să aibă cel puțin 3 caractere.")]
        public string Username { get; set; } = string.Empty;

        [Required(ErrorMessage = "Adresa de email este obligatorie.")]
        [EmailAddress(ErrorMessage = "Introduceți o adresă de email validă.")]
        public string Email { get; set; } = string.Empty;  // ✅ Adăugat `Email`

        [Required(ErrorMessage = "Parola este obligatorie.")]
        [MinLength(6, ErrorMessage = "Parola trebuie să aibă cel puțin 6 caractere.")]
        [DataType(DataType.Password)]
        public string Password { get; set; } = string.Empty;

        public string Role { get; set; } = "user";  // ✅ Setare implicită pentru utilizatori normali

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;  // ✅ Salvare dată automat
    }
}
