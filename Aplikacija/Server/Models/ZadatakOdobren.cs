using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace server.Models
{

    [Table("ZadatakOdobren")]
    public class ZadatakOdobren
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }
        [Column("TekstZadatka")]
        public string TekstZadatka { get; set; }
        [Column("Jezik")]
        [MaxLength(255)]
        public string ProgramskiJezik { get; set; }
        [Column("OpcijaA")]
        [MaxLength(255)]
        public string OpcijaA { get; set; }
        [Column("OpcijaB")]
        [MaxLength(255)]
        public string OpcijaB { get; set; }
        [Column("OpcijaC")]
        [MaxLength(255)]
        public string OpcijaC { get; set; }
        [Column("TacanOdgovor")]
        [MaxLength(255)]
        public string TacanOdgovor { get; set; }
        [Column("BrojBodova")]
        [DataType("number")]
        public int BrojBodova { get; set; }
        [Column("BrojLikes")]
        [DataType("number")]
        public int BrojLikes { get; set; }
        [Column("ZadatakJeOk")]
        [DataType("number")]
        public int ZadatakJeOk { get; set; }
        [Column("ZadatakPrelak")]
        [DataType("number")]
        public int ZadatakPrelak { get; set; }
        [Column("ZadatakPretezak")]
        [DataType("number")]
        public int ZadatakPretezak { get; set; }
        [Column("BrojDislikes")]
        [DataType("number")]
        public int BrojDislikes { get; set; }
        [Column("Objasnjenje")]
        public string Objasnjenje { get; set; }

        [Column("AutorZadatka")]
        [MaxLength(255)]
        public string AutorZadatka { get; set; }
        public Korisnik TrenutniKorisnik { get; set; }
    }
}