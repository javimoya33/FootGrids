using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FootGrids.Migrations
{
    /// <inheritdoc />
    public partial class Soluciones : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Soluciones",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdAPI = table.Column<int>(type: "int", nullable: false),
                    TablaAPI = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PistasId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Soluciones", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Soluciones_Pistas_PistasId",
                        column: x => x.PistasId,
                        principalTable: "Pistas",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Soluciones_PistasId",
                table: "Soluciones",
                column: "PistasId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Soluciones");
        }
    }
}
