using SAI.AttendanceTracker.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace SAI.AttendanceTracker
{
    public class AttendanceDTO
    {
        public int AttendanceID { get;set; }
        public int StudentID { get; set; }
        public string Status { get; set; }
        public DateOnly Date { get; set; }
    }
}
