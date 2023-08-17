using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FootGrids.Migrations
{
    /// <inheritdoc />
    public partial class TipoLink : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Link",
                table: "Pistas",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Tipo",
                table: "Pistas",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Link",
                table: "Pistas");

            migrationBuilder.DropColumn(
                name: "Tipo",
                table: "Pistas");
        }
    }
}
