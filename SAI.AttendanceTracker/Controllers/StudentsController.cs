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
    public class StudentsController : ControllerBase
    {
        private readonly SAIContext _context;

        public StudentsController(SAIContext context)
        {
            _context = context;
        }

        // GET: api/Students
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentDTO>>> GetStudents()
        {
          if (_context.Students == null)
          {
              return NotFound();
          }
            return await _context.Students.Select(s => StudentToDTO(s)).ToListAsync();
        }

        // GET: api/Students/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StudentDTO>> GetStudent(int id)
        {
          if (_context.Students == null)
          {
              return NotFound();
          }
            var student = await _context.Students.FindAsync(id);

            if (student == null)
            {
                return NotFound();
            }

            return StudentToDTO(student);
        }

        [HttpGet("{id}/notes")]
        public async Task<ActionResult<StudentWithNotesDTO>> GetStudentWithNotes(int id)
        {
            if (_context.Students == null)
            {
                return NotFound();
            }
            var student = await _context.Students.Include(s => s.Attendances).FirstOrDefaultAsync(s => s.StudentID == id);

            if (student == null)
            {
                return NotFound();
            }

            return StudentWithNotesToDTO(student);
        }

        // PUT: api/Students/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudent(int id, StudentDTO studentDTO)
        {
            if (id != studentDTO.StudentID)
            {
                return BadRequest();
            }

            var student = StudentFromDTO(studentDTO);
            _context.Entry(student).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Students
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Student>> PostStudent(StudentDTO studentDTO)
        {
          if (_context.Students == null)
          {
              return Problem("Entity set 'SAIContext.Students'  is null.");
          }
            var student = StudentFromDTO(studentDTO);
            _context.Students.Add(student);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStudent", new { id = studentDTO.StudentID }, StudentToDTO(student));
        }

        // DELETE: api/Students/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            if (_context.Students == null)
            {
                return NotFound();
            }
            var student = await _context.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }

            _context.Students.Remove(student);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StudentExists(int id)
        {
            return (_context.Students?.Any(e => e.StudentID == id)).GetValueOrDefault();
        }

        private static StudentDTO StudentToDTO(Student student)
        {
            return new StudentDTO
            {
                FirstName = student.FirstName,
                LastName = student.LastName,
                MiddleName = student.MiddleName,
                PinnedNoteID = student.PinnedNoteID,
                StudentID = student.StudentID,
                UserID = student.UserID
            };
        }

        private static Student StudentFromDTO(StudentDTO student)
        {
            return new Student
            {
                FirstName = student.FirstName,
                LastName = student.LastName,
                MiddleName = student.MiddleName,
                PinnedNoteID = student.PinnedNoteID,
                StudentID = student.StudentID,
                UserID = student.UserID
            };
        }

        private static StudentWithNotesDTO StudentWithNotesToDTO(Student student)
        {
            List<NoteDTO> notesDTO = new List<NoteDTO>();
            foreach (var note in student.Notes)
            {
                notesDTO.Add(new NoteDTO
                {
                    NoteID = note.NoteID,
                    Type = note.Type,
                    Content = note.Content,
                    StudentID = note.StudentID,
                    Created = note.Created
                });
            }
            return new StudentWithNotesDTO
            {
                PinnedNoteID = student.PinnedNoteID,
                FirstName = student.FirstName,
                LastName = student.LastName,
                MiddleName = student.MiddleName,
                StudentID = student.StudentID,
                Notes = notesDTO
            };
        }

    }
}
