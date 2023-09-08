using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FootGrids.Migrations
{
    /// <inheritdoc />
    public partial class Soluciones3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NumSolucion",
                table: "Soluciones",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumSolucion",
                table: "Soluciones");
        }
    }
}
