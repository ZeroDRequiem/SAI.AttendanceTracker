using System.ComponentModel.DataAnnotations.Schema;

namespace SAI.AttendanceTracker.Models
{
    public class Note
    {
        public int NoteID { get; set; }
        public string? Type { get; set; }
        public string Content { get; set; }

        [ForeignKey("StudentID")]
        public int StudentID { get; set; }
        [NotMapped]
        public Student Student { get; set; }
        public DateTime Created { get; set;}
    }
}
