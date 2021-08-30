using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class V2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ID",
                table: "Resavanje",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Resavanje",
                table: "Resavanje",
                column: "ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Resavanje",
                table: "Resavanje");

            migrationBuilder.DropColumn(
                name: "ID",
                table: "Resavanje");
        }
    }
}
