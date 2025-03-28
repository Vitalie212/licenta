using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TireStoreAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$jDzil0o5OatF1LgoVGoaIejqGj8UklW9xo3mwbjby756ozHaU32s.");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$3q.0uIQH7eoU.JGX9SWFOeqDIX2BpCrEbfMa3i4A/DZx/Uq5Aq8Ze");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$8XCfItidt0ggRWf8BBdUEesvbkGlXBgsX1Snrro5U2TOrZjrLClYa");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$2osnqVxHCvnqR9hC/IeQkOq1zvV3L5X9nRQLbwpyO7CPuas8Pbxw.");
        }
    }
}
