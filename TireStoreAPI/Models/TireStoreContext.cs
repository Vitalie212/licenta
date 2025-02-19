using Microsoft.EntityFrameworkCore;

namespace TireStoreApi.Models
{
    public class TireStoreContext : DbContext
    {
        public TireStoreContext(DbContextOptions<TireStoreContext> options)
            : base(options)
        { }

        public DbSet<Tire> Tires { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
