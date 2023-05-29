using Microsoft.EntityFrameworkCore;
using SAI.AttendanceTracker;
using SAI.AttendanceTracker.Models;
using System.Text.Json.Serialization;

//using (SAIContext context = new SAIContext())
//{
//    //context.Database.EnsureCreated();
//    //GetUsersWithStudents();
//var students = context.Students.FromSqlInterpolated($"StudentsofUser {1}").ToList();
//}

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers()
    .AddJsonOptions(opt => opt.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<SAIContext>(
    opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("SaiConnection"))
        .EnableSensitiveDataLogging()
        .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();

//void GetUsersWithStudents()
//{
//    using var context = new SAIContext();
//    var users = context.Users.Include(x => x.Students).ToList();
//    foreach (var user in users)
//    {
//        Console.WriteLine(user.Name);
//        foreach(var student in user.Students)
//        {
//            Console.WriteLine($"\t{student.FirstName} {student.LastName}");
//        }
//    }
//}

//void AddTestData()
//{
//    using var context = new SAIContext();
//    var user = context.Users.FirstOrDefault();
//    if (user == null)
//    {
//        var newUser = new User { Name = "spooky", Email = "spooky@spooky.net", Password = "1234" };
//        newUser.Students.Add(new Student { FirstName = "Abdurrahman", LastName = "Alatas", MiddleName = "\"Abe\"" });
//        newUser.Students.Add(new Student { FirstName = "Alpacasso", LastName = "Kennedy" });
//        newUser.Students.Add(new Student { FirstName = "Hakuno", LastName = "Kishinami", MiddleName = "Zabiko" });
//        context.SaveChanges();
//    }
//}