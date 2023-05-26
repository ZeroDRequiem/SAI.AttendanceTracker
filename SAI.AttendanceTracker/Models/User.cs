using System.ComponentModel.DataAnnotations.Schema;

namespace SAI.AttendanceTracker.Models
{
    public class User
    {
        public User() {
            Students = new List<Student>();
        }

        public int UserID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public List<Student> Students { get; set; }
    }
}
