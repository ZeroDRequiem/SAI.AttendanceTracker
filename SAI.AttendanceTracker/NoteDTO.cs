using SAI.AttendanceTracker.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace SAI.AttendanceTracker
{
    public class NoteDTO
    {
        public int NoteID { get; set; }
        public string? Type { get; set; }
        public string Content { get; set; }
        public int StudentID { get; set; }
        public DateTime Created { get; set; }
    }
}
