using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SAI.AttendanceTracker.Migrations
{
    /// <inheritdoc />
    public partial class addStoredProcStudentAttendanceOnDate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                @"CREATE PROCEDURE dbo.StudentAttendanceOnDate
	                @userID int,
	                @date date
                  AS
                  SELECT Students.StudentID, Students.FirstName, Students.LastName, Students.MiddleName, Students.PinnedNoteID, Attendances.Status 
                  FROM Students 
                  LEFT JOIN Attendances
                  ON Students.StudentID = Attendances.StudentID
                  AND Attendances.Date = @date AND Students.UserID = @userID
                ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                @"DROP PROCEDURE dbo.StudentAttendanceOnDate");
        }
    }
}
