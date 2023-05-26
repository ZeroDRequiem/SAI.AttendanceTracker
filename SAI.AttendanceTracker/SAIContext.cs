using Microsoft.EntityFrameworkCore;
using SAI.AttendanceTracker.Models;

namespace SAI.AttendanceTracker
{
    public class SAIContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Note> Notes { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Attendance> Attendances { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(
                "Data Source = (localdb)\\MSSQLLocalDB; Initial Catalog = SAIDatabase")
                .EnableSensitiveDataLogging();
        }
    }
}
