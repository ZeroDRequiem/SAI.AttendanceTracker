using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SAI.AttendanceTracker.Migrations
{
    /// <inheritdoc />
    public partial class addstoredproc : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                @"CREATE PROCEDURE dbo.StudentsofUser
	                @userID int
                  AS
                  SELECT * FROM Students 
                  WHERE Students.UserID = @userID
                ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                @"DROP PROCEDURE dbo.StudentsofUser");
        }
    }
}
