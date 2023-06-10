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
    public class AttendancesController : ControllerBase
    {
        private readonly SAIContext _context;

        public AttendancesController(SAIContext context)
        {
            _context = context;
        }

        // GET: api/Attendances
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AttendanceDTO>>> GetAttendances()
        {
          if (_context.Attendances == null)
          {
              return NotFound();
          }
            return await _context.Attendances.Select(a => AttendanceToDTO(a)).ToListAsync();
        }

        // GET: api/Attendances/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AttendanceDTO>> GetAttendance(int id)
        {
          if (_context.Attendances == null)
          {
              return NotFound();
          }
            var attendance = await _context.Attendances.FindAsync(id);

            if (attendance == null)
            {
                return NotFound();
            }

            return AttendanceToDTO(attendance);
        }

        // PUT: api/Attendances/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAttendance(int id, AttendanceDTO attendanceDTO)
        {
            if (id != attendanceDTO.AttendanceID)
            {
                return BadRequest();
            }

            var attendance = AttendanceFromDTO(attendanceDTO);
            _context.Entry(attendance).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AttendanceExists(id))
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

        // POST: api/Attendances
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Attendance>> PostAttendance(AttendanceDTO attendanceDTO)
        {
          if (_context.Attendances == null)
          {
              return Problem("Entity set 'SAIContext.Attendances'  is null.");
          }
            var attendance = AttendanceFromDTO(attendanceDTO);
            _context.Attendances.Add(attendance);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAttendance", new { id = attendanceDTO.AttendanceID }, AttendanceToDTO(attendance));
        }

        // DELETE: api/Attendances/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAttendance(int id)
        {
            if (_context.Attendances == null)
            {
                return NotFound();
            }
            var attendance = await _context.Attendances.FindAsync(id);
            if (attendance == null)
            {
                return NotFound();
            }

            _context.Attendances.Remove(attendance);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AttendanceExists(int id)
        {
            return (_context.Attendances?.Any(e => e.AttendanceID == id)).GetValueOrDefault();
        }

        private static AttendanceDTO AttendanceToDTO(Attendance attendance)
        {
            return new AttendanceDTO
            {
                AttendanceID = attendance.AttendanceID,
                StudentID = attendance.StudentID,
                Status = attendance.Status,
                Date = attendance.Date
            };
        }

        private static Attendance AttendanceFromDTO(AttendanceDTO attendance)
        {
            return new Attendance
            {
                AttendanceID = attendance.AttendanceID,
                StudentID = attendance.StudentID,
                Status = attendance.Status,
                Date = attendance.Date
            };
        }
    }
}
