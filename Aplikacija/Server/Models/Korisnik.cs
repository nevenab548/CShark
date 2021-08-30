using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace server.Models
{

    [Table("Korisnik")]
    public class Korisnik
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Email")]
        [MaxLength(255)]
        public string Email { get; set; }
        [Column("KorisnickoIme")]
        [MaxLength(255)]
        public string KorisnickoIme { get; set; }
        [Column("Sifra")]
        [MaxLength(255)]
        public string Sifra { get; set; }
        [Column("BrojBodova")]
        [DataType("number")]
        public int BrojBodova { get; set; }
        [Column("TipKorisnika")]
        [MaxLength(255)]
        public string TipKorisnika { get; set; }
        //public virtual List<int> ReseniZadaci { get; set; }
    }
}