using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace server.Models
{
    [Table("Greska")]
    public class Greska
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }
        [Column("IDZadatka")]
        [DataType("number")]
        public int IDZadatka { get; set; }
        [Column("TekstGreske")]
        [MaxLength(255)]
        public string TekstGreske { get; set; }

    }
}