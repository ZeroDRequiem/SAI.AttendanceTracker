using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace SAI.AttendanceTracker.Migrations
{
    /// <inheritdoc />
    public partial class seedAttendance : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Attendances",
                columns: new[] { "AttendanceID", "Date", "Status", "StudentID" },
                values: new object[,]
                {
                    { 1, new DateTime(2023, 5, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), "Attended", 1 },
                    { 2, new DateTime(2023, 5, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), "Absent", 2 },
                    { 3, new DateTime(2023, 5, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), "Excused", 3 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Attendances",
                keyColumn: "AttendanceID",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Attendances",
                keyColumn: "AttendanceID",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Attendances",
                keyColumn: "AttendanceID",
                keyValue: 3);
        }
    }
}
