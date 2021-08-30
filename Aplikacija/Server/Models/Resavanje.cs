using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models
{
    [Table("Resavanje")]
    public class Resavanje
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }
        [Column("Korisnik")]
        [DataType("number")]
        public virtual int Korisnik { get; set; }
        [Column("Zadatak")]
        [DataType("number")]
        public virtual int Zadatak { get; set; }
    }
}