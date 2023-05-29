using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SAI.AttendanceTracker.Models;
using System.ComponentModel;

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
                .LogTo(Console.WriteLine, new[] {DbLoggerCategory.Database.Command.Name}, LogLevel.Information)
                .EnableSensitiveDataLogging();
        }

        protected override void ConfigureConventions(ModelConfigurationBuilder builder)
        {
            builder.Properties<DateOnly>()
                .HaveConversion<DateOnlyConverter>()
                .HaveColumnType("date");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
                new User { UserID = 1, Name = "spooky", Email = "spooky@spooky.net", Password = "1234" });

            var students = new Student[]
            {
                new Student { FirstName = "Abdurrahman", LastName = "Alatas", MiddleName = "\"Abe\"", UserID = 1, StudentID = 1 },
                new Student { FirstName = "Alpacasso", LastName = "Kennedy", UserID = 1, StudentID = 2 },
                new Student { FirstName = "Hakuno", LastName = "Kishinami", MiddleName = "Zabiko", UserID = 1, StudentID = 3 }
            };
            modelBuilder.Entity<Student>().HasData(students);
        }

    }
    public class DateOnlyConverter : ValueConverter<DateOnly, DateTime>
    {
        public DateOnlyConverter() : base(
                d => d.ToDateTime(TimeOnly.MinValue),
                d => DateOnly.FromDateTime(d))
        { }
    }
}
