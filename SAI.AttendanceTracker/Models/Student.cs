using System.ComponentModel.DataAnnotations.Schema;

namespace SAI.AttendanceTracker.Models
{
    public class Student
    {
        public Student() {
            Notes = new List<Note>();
            Attendances = new List<Attendance>();
        }
        public int StudentID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? MiddleName { get; set; }

        public List<Note> Notes { get; set; }

        public List<Attendance> Attendances { get; set; }

        public int? PinnedNoteID { get; set; }

    }
}
