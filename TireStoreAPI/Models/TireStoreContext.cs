using Microsoft.EntityFrameworkCore;
using TireStoreAPI.Models;

namespace TireStoreApi.Models
{
    public class TireStoreContext : DbContext
    {
        public TireStoreContext(DbContextOptions<TireStoreContext> options)
            : base(options)
        {
        }

        // DbSet pentru anvelope
        public DbSet<Tire> Tires { get; set; }

        // ✅ DbSet pentru utilizatori
        public DbSet<User> Users { get; set; }
        public DbSet<Payment> Payments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ✅ Definire cheie primară pentru User
            modelBuilder.Entity<User>()
                .HasKey(u => u.Id);

            // Opțional: Adaugă date de test pentru User
            modelBuilder.Entity<User>().HasData(
                new User { Id = 1, Username = "admin", Password = "admin123", Role = "Admin" },
                new User { Id = 2, Username = "user", Password = "user123", Role = "User" }
            );
        }
    }
}
