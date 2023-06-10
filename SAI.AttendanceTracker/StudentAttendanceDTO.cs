using SAI.AttendanceTracker.Models;

namespace SAI.AttendanceTracker
{
    public class StudentAttendanceDTO
    {
        public int StudentID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? MiddleName { get; set; }
        public int? PinnedNoteID { get; set; }
        public int UserID { get; set; }
        public int? AttendanceID { get; set; }
        public string? Status { get; set; }

    }
}
