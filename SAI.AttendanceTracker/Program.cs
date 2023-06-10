using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using SAI.AttendanceTracker;
using SAI.AttendanceTracker.Models;
using System.Globalization;
using System.Text.Json;
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
    .AddJsonOptions(opt => opt.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles)
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new DateOnlyJsonConverter());
    });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
    options.MapType<DateOnly>(() => new OpenApiSchema
    {
        Type = "string",
        Format = "date",
        Example = new OpenApiString("2022-01-01")
    })
);
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

public class DateOnlyJsonConverter : JsonConverter<DateOnly>
{
    private const string Format = "yyyy-MM-dd";

    public override DateOnly Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        return DateOnly.ParseExact(reader.GetString()!, Format, CultureInfo.InvariantCulture);
    }

    public override void Write(Utf8JsonWriter writer, DateOnly value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString(Format, CultureInfo.InvariantCulture));
    }
}
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