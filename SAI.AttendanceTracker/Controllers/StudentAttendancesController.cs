using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SAI.AttendanceTracker;
using SAI.AttendanceTracker.Models;

namespace SAI.AttendanceTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentAttendancesController : ControllerBase
    {
        private readonly SAIContext _context;

        public StudentAttendancesController(SAIContext context)
        {
            _context = context;
        }

        // GET: api/StudentAttendances
        [HttpGet("{userID}/{date}")]
        public async Task<ActionResult<IEnumerable<StudentAttendanceDTO>>> GetStudentAttendancesOnDate(int userID, string date)
        {



            if (_context.Students == null)
            {
                return NotFound();
            }
            DateOnly dateOnly;
            try
            {
                dateOnly = DateFromString(date);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }

            //_context.Set<Attendance>().Include(a => a.Student).Where(a => a.Date == dateOnly).Select(a => a.Student);

            var studentAttendances = _context.Set<Student>().Include(s => s.Attendances);

            var studentAttendanceDTOs = studentAttendances.Select(x => new StudentAttendanceDTO
            {
                StudentID = x.StudentID,
                FirstName = x.FirstName,
                LastName = x.LastName,
                MiddleName = x.MiddleName,
                PinnedNoteID = x.PinnedNoteID,
                UserID = x.UserID,
                Status = x.Attendances.Where(a => a.Date == dateOnly).Any() ? null : x.Attendances.First(x => x.Date == dateOnly).Status,
            }).ToList();

            return studentAttendanceDTOs;

            //string dateSQL = $"'{dateOnly.Year}-{dateOnly.Month}-{dateOnly.Day}'";
            //var test = _context.Database.ExecuteSqlInterpolated($"EXEC StudentAttendanceOnDate {userID} {dateSQL}");

            //var studentAttendances = _context.Database.SqlQuery<StudentAttendanceDTO>($"EXEC StudentAttendanceOnDate {userID} {dateSQL}").ToList();

            throw new NotImplementedException();//studentAttendances;
        }

        // GET: api/StudentAttendances/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<Student>> GetStudent(int id)
        //{
        //  if (_context.Students == null)
        //  {
        //      return NotFound();
        //  }
        //    var student = await _context.Students.FindAsync(id);

        //    if (student == null)
        //    {
        //        return NotFound();
        //    }

        //    return student;
        //}

        // PUT: api/StudentAttendances/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{userID}/{date}")]
        public async Task<IActionResult> PutStudent(int userID, string date, List<StudentAttendanceDTO> studentAttendanceDTOs)
        {
            DateOnly dateOnly = DateFromString(date);
            var studentAttendances = _context.Set<Student>().Include(s => s.Attendances);

            foreach (var studentAttendance in studentAttendanceDTOs)
            {
                var student = studentAttendances.FirstOrDefault(s => s.StudentID == studentAttendance.StudentID);
                if(student == null || studentAttendance.Status == null)
                {
                    return BadRequest();
                }
                var attendance = student.Attendances.Where(a => a.Date == dateOnly).FirstOrDefault();
                if(attendance == null)
                {
                    //create new attendance record
                    _context.Attendances.Add(new Attendance 
                    { 
                        StudentID = student.StudentID,
                        Student = student,
                        Status = studentAttendance.Status,
                        Date = dateOnly
                    });
                }
                else
                {
                    attendance.Status = studentAttendance.Status;
                    _context.Entry(attendance).State = EntityState.Modified;
                }
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/StudentAttendances
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost]
        //public async Task<ActionResult<Student>> PostStudent(Student student)
        //{
        //  if (_context.Students == null)
        //  {
        //      return Problem("Entity set 'SAIContext.Students'  is null.");
        //  }
        //    _context.Students.Add(student);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetStudent", new { id = student.StudentID }, student);
        //}

        // DELETE: api/StudentAttendances/5
        //[HttpDelete("{userID}/{date}")]
        //public async Task<IActionResult> DeleteStudent(int userID, string date)
        //{
        //    if (_context.Attendances == null)
        //    {
        //        return NotFound();
        //    }
        //    var student = await _context.Students.FindAsync(id);
        //    if (student == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Students.Remove(student);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        //private bool StudentExists(int id)
        //{
        //    return (_context.Students?.Any(e => e.StudentID == id)).GetValueOrDefault();
        //}

        private DateOnly DateFromString(string dateString)
        {
            int dateNum;
            if(dateString.Length != 8 || !int.TryParse(dateString, out dateNum))
            {
                throw new ArgumentException("Unexpected format for date, expects YYYYMMDD");
            }
            DateOnly dateOnly = new DateOnly(
                int.Parse(dateString.Substring(0,4)),
                int.Parse(dateString.Substring(4,2)),
                int.Parse(dateString.Substring(6)));
            return dateOnly;
        }
    }
}
