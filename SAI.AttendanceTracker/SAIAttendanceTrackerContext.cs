using Microsoft.EntityFrameworkCore;

namespace SAI.AttendanceTracker
{
    public class SAIAttendanceTrackerContext: DbContext
    {
        public SAIAttendanceTrackerContext(DbContextOptions<SAIAttendanceTrackerContext> options)
            : base(options)
        {

        }
    }
}
