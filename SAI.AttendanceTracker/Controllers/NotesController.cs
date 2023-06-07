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
    public class NotesController : ControllerBase
    {
        private readonly SAIContext _context;

        public NotesController(SAIContext context)
        {
            _context = context;
        }

        // GET: api/Notes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NoteDTO>>> GetNotes()
        {
            if (_context.Notes == null)
            {
                return NotFound();
            }
            return await _context.Notes.Select(n => NoteToDTO(n)).ToListAsync();
        }

        // GET: api/Notes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<NoteDTO>> GetNote(int id)
        {
          if (_context.Notes == null)
          {
              return NotFound();
          }
            var note = await _context.Notes.FindAsync(id);

            if (note == null)
            {
                return NotFound();
            }

            return NoteToDTO(note);
        }

        // PUT: api/Notes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNote(int id, NoteDTO noteDTO)
        {
            if (id != noteDTO.NoteID)
            {
                return BadRequest();
            }

            var note = NoteFromDTO(noteDTO);
            _context.Entry(note).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NoteExists(id))
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

        // POST: api/Notes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Note>> PostNote(NoteDTO noteDTO)
        {
          if (_context.Notes == null)
          {
              return Problem("Entity set 'SAIContext.Notes'  is null.");
          }
            var note = NoteFromDTO(noteDTO);
            _context.Notes.Add(note);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNote", new { id = noteDTO.NoteID }, note);
        }

        // DELETE: api/Notes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNote(int id)
        {
            if (_context.Notes == null)
            {
                return NotFound();
            }
            var note = await _context.Notes.FindAsync(id);
            if (note == null)
            {
                return NotFound();
            }

            _context.Notes.Remove(note);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool NoteExists(int id)
        {
            return (_context.Notes?.Any(e => e.NoteID == id)).GetValueOrDefault();
        }

        private static NoteDTO NoteToDTO(Note note)
        {
            return new NoteDTO
            {
                NoteID = note.NoteID,
                Type = note.Type,
                Content = note.Content,
                StudentID = note.StudentID,
                Created = note.Created
            };
        }

        private static Note NoteFromDTO(NoteDTO noteDTO)
        {
            return new Note
            {
                NoteID = noteDTO.NoteID,
                Type = noteDTO.Type,
                Content = noteDTO.Content,
                StudentID = noteDTO.StudentID,
                Created = noteDTO.Created
            };
        }
    }
}
