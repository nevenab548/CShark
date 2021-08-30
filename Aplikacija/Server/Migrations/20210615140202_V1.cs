using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Greska",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IDZadatka = table.Column<int>(type: "int", nullable: false),
                    TekstGreske = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Greska", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Korisnik",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    KorisnickoIme = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Sifra = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    BrojBodova = table.Column<int>(type: "int", nullable: false),
                    TipKorisnika = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Korisnik", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Resavanje",
                columns: table => new
                {
                    Korisnik = table.Column<int>(type: "int", nullable: false),
                    Zadatak = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                });

            migrationBuilder.CreateTable(
                name: "ZadatakNaCekanju",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TekstZadatka = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Jezik = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    OpcijaA = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    OpcijaB = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    OpcijaC = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    TacanOdgovor = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    BrojBodova = table.Column<int>(type: "int", nullable: false),
                    BrojLikes = table.Column<int>(type: "int", nullable: false),
                    ZadatakJeOk = table.Column<int>(type: "int", nullable: false),
                    ZadatakPrelak = table.Column<int>(type: "int", nullable: false),
                    ZadatakPretezak = table.Column<int>(type: "int", nullable: false),
                    BrojDislikes = table.Column<int>(type: "int", nullable: false),
                    Objasnjenje = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AutorZadatka = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    TrenutniKorisnikID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ZadatakNaCekanju", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ZadatakNaCekanju_Korisnik_TrenutniKorisnikID",
                        column: x => x.TrenutniKorisnikID,
                        principalTable: "Korisnik",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ZadatakOdobren",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TekstZadatka = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Jezik = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    OpcijaA = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    OpcijaB = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    OpcijaC = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    TacanOdgovor = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    BrojBodova = table.Column<int>(type: "int", nullable: false),
                    BrojLikes = table.Column<int>(type: "int", nullable: false),
                    ZadatakJeOk = table.Column<int>(type: "int", nullable: false),
                    ZadatakPrelak = table.Column<int>(type: "int", nullable: false),
                    ZadatakPretezak = table.Column<int>(type: "int", nullable: false),
                    BrojDislikes = table.Column<int>(type: "int", nullable: false),
                    Objasnjenje = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AutorZadatka = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    TrenutniKorisnikID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ZadatakOdobren", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ZadatakOdobren_Korisnik_TrenutniKorisnikID",
                        column: x => x.TrenutniKorisnikID,
                        principalTable: "Korisnik",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ZadatakNaCekanju_TrenutniKorisnikID",
                table: "ZadatakNaCekanju",
                column: "TrenutniKorisnikID");

            migrationBuilder.CreateIndex(
                name: "IX_ZadatakOdobren_TrenutniKorisnikID",
                table: "ZadatakOdobren",
                column: "TrenutniKorisnikID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Greska");

            migrationBuilder.DropTable(
                name: "Resavanje");

            migrationBuilder.DropTable(
                name: "ZadatakNaCekanju");

            migrationBuilder.DropTable(
                name: "ZadatakOdobren");

            migrationBuilder.DropTable(
                name: "Korisnik");
        }
    }
}
