using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FootGrids.Migrations
{
    /// <inheritdoc />
    public partial class NumPista : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NumPista",
                table: "GridsPista",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumPista",
                table: "GridsPista");
        }
    }
}
