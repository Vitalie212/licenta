using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TireStoreAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddTireDetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Tires",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Tires",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Tires",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Tires");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "Tires");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Tires");
        }
    }
}
