using FootGrids.Models;
using Microsoft.EntityFrameworkCore;
using DbContext = Microsoft.EntityFrameworkCore.DbContext;


namespace FootGrids
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions options): base(options)
        {

        }

        public ApplicationDbContext()
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<GridPista>()
                .HasKey(x => new { x.GridId, x.PistaId });
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Grid> Grids { get; set; }
        public DbSet<Pista> Pistas { get; set; }
        public DbSet<GridPista> GridsPista { get; set; }
        public DbSet<Solucion> Soluciones { get; set; }
    }
}
