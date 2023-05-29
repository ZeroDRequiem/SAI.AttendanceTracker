using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SAI.AttendanceTracker.Migrations
{
    /// <inheritdoc />
    public partial class seedStudentWithNoAttendance : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Students",
                columns: new[] { "StudentID", "FirstName", "LastName", "MiddleName", "PinnedNoteID", "UserID" },
                values: new object[] { 4, "Lelouch", "Lamperouge", null, null, 1 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Students",
                keyColumn: "StudentID",
                keyValue: 4);
        }
    }
}
