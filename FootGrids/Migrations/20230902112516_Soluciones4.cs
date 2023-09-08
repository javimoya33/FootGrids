using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FootGrids.Migrations
{
    /// <inheritdoc />
    public partial class Soluciones4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Soluciones_Pistas_PistasId",
                table: "Soluciones");

            migrationBuilder.RenameColumn(
                name: "PistasId",
                table: "Soluciones",
                newName: "PistaId");

            migrationBuilder.RenameIndex(
                name: "IX_Soluciones_PistasId",
                table: "Soluciones",
                newName: "IX_Soluciones_PistaId");

            migrationBuilder.AddColumn<int>(
                name: "GridId",
                table: "Soluciones",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Soluciones_GridId",
                table: "Soluciones",
                column: "GridId");

            migrationBuilder.AddForeignKey(
                name: "FK_Soluciones_Grids_GridId",
                table: "Soluciones",
                column: "GridId",
                principalTable: "Grids",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Soluciones_Pistas_PistaId",
                table: "Soluciones",
                column: "PistaId",
                principalTable: "Pistas",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Soluciones_Grids_GridId",
                table: "Soluciones");

            migrationBuilder.DropForeignKey(
                name: "FK_Soluciones_Pistas_PistaId",
                table: "Soluciones");

            migrationBuilder.DropIndex(
                name: "IX_Soluciones_GridId",
                table: "Soluciones");

            migrationBuilder.DropColumn(
                name: "GridId",
                table: "Soluciones");

            migrationBuilder.RenameColumn(
                name: "PistaId",
                table: "Soluciones",
                newName: "PistasId");

            migrationBuilder.RenameIndex(
                name: "IX_Soluciones_PistaId",
                table: "Soluciones",
                newName: "IX_Soluciones_PistasId");

            migrationBuilder.AddForeignKey(
                name: "FK_Soluciones_Pistas_PistasId",
                table: "Soluciones",
                column: "PistasId",
                principalTable: "Pistas",
                principalColumn: "Id");
        }
    }
}
