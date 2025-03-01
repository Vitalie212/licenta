namespace TireStoreApi.Models
{
    public class UserLogin
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
        public required string Role { get; set; }

    }
}

