using System.ComponentModel.DataAnnotations.Schema;

namespace SAI.AttendanceTracker.Models
{
    public class Student
    {
        public int StudentID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? MiddleName { get; set; }

        [ForeignKey("NoteID")]
        public List<Note> Notes { get; set; }

        [ForeignKey("AttendanceID")]
        public List<Attendance> Attendances { get; set; }
        public Note? PinnedNote { get; set; }

    }
}
