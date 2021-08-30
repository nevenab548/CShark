using Microsoft.EntityFrameworkCore;

namespace server.Models
{

    public class CSharkContext : DbContext
    {
        public DbSet<Korisnik> Korisnici { get; set; }
        public DbSet<ZadatakNaCekanju> ZadaciNaCekanju { get; set; }
        public DbSet<ZadatakOdobren> ZadaciOdobreni { get; set; }
        public DbSet<Greska> Greske { get; set; }

        public DbSet<Resavanje> Resavanja { get; set; }
        public CSharkContext(DbContextOptions options) : base(options)
        {

        }
    }
}