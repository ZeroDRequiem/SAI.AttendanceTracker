using System.ComponentModel.DataAnnotations.Schema;

namespace SAI.AttendanceTracker.Models
{
    public class Attendance
    {
        public int AttendanceID { get; set; }

        [ForeignKey("StudentID")]
        public int StudentID { get; set; }
        [NotMapped]
        public Student Student { get; set; }
        public string? Status { get; set; }
        public DateOnly Date { get; set; }
    }
}
