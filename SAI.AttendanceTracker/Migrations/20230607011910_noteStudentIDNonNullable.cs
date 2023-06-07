using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SAI.AttendanceTracker.Migrations
{
    /// <inheritdoc />
    public partial class noteStudentIDNonNullable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Students_StudentID",
                table: "Notes");

            migrationBuilder.AlterColumn<int>(
                name: "StudentID",
                table: "Notes",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Students_StudentID",
                table: "Notes",
                column: "StudentID",
                principalTable: "Students",
                principalColumn: "StudentID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Students_StudentID",
                table: "Notes");

            migrationBuilder.AlterColumn<int>(
                name: "StudentID",
                table: "Notes",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Students_StudentID",
                table: "Notes",
                column: "StudentID",
                principalTable: "Students",
                principalColumn: "StudentID");
        }
    }
}
