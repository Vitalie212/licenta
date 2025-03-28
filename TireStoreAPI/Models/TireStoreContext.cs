using Microsoft.EntityFrameworkCore;
using TireStoreApi.Models;
using TireStoreAPI.Models;
using BCrypt.Net;

namespace TireStoreApi.Models
{
    public class TireStoreContext : DbContext
    {
        public TireStoreContext(DbContextOptions<TireStoreContext> options)
            : base(options)
        {
        }

        public DbSet<Tire> Tires { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Payment> Payments { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.ConfigureWarnings(warnings => warnings.Ignore(Microsoft.EntityFrameworkCore.Diagnostics.RelationalEventId.PendingModelChangesWarning));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ✅ Definire cheie primară pentru User
            modelBuilder.Entity<User>().HasKey(u => u.Id);

            // ✅ Asigurare unicitate pentru `Username` și `Email`
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Username)
                .IsUnique();

            // ✅ Configurare coloană `CreatedAt` să aibă valoare implicită
            modelBuilder.Entity<User>()
                .Property(u => u.CreatedAt)
                .HasDefaultValueSql("GETDATE()");

            // ✅ Asigurare că tabela Users conține coloanele necesare
            modelBuilder.Entity<User>().Property(u => u.FullName).IsRequired();
            modelBuilder.Entity<User>().Property(u => u.Email).IsRequired();
            modelBuilder.Entity<User>().Property(u => u.Password).IsRequired();
            modelBuilder.Entity<User>().Property(u => u.Role).HasDefaultValue("User");

            // ✅ Configurare precizie pentru `decimal` (evităm trunchierea valorilor)
            modelBuilder.Entity<Tire>().Property(t => t.Width).HasPrecision(18, 2);
            modelBuilder.Entity<Tire>().Property(t => t.Height).HasPrecision(18, 2);
            modelBuilder.Entity<Tire>().Property(t => t.Diameter).HasPrecision(18, 2);
            modelBuilder.Entity<Tire>().Property(t => t.Price).HasPrecision(18, 2);
            modelBuilder.Entity<Payment>().Property(p => p.Amount).HasPrecision(18, 2);

            // ✅ Adăugare date de test pentru User cu valori STATICE
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    FullName = "Admin User",
                    Username = "admin",
                    Email = "admin@example.com",
                    Password = BCrypt.Net.BCrypt.HashPassword("admin123"),
                    Role = "Admin",
                    CreatedAt = new DateTime(2024, 1, 1) // 🔹 Valoare FIXĂ pentru a evita `PendingModelChangesWarning`
                },
                new User
                {
                    Id = 2,
                    FullName = "Test User",
                    Username = "user",
                    Email = "user@example.com",
                    Password = BCrypt.Net.BCrypt.HashPassword("user123"),
                    Role = "User",
                    CreatedAt = new DateTime(2024, 1, 1) // 🔹 Valoare FIXĂ pentru a evita `PendingModelChangesWarning`
                }
            );
        }
    }
}
