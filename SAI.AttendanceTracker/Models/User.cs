using System.ComponentModel.DataAnnotations.Schema;

namespace SAI.AttendanceTracker.Models
{
    public class User
    {
        public int UserID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }


        [ForeignKey("StudentID")]
        public List<Student> Students { get; set; } = new List<Student>();
    }
}
