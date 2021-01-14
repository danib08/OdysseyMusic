using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SongsController : ControllerBase
    {
        private readonly OdysseyMusicDB odysseyDB;

        public SongsController(OdysseyMusicDB odysseyDB)
        {
            this.odysseyDB = odysseyDB;
        }

        // GET: api/<SongsController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var songs = await odysseyDB.Songs.ToListAsync();
            return Ok(songs);
        }

        // GET api/<SongsController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var song = await odysseyDB.Songs.FindAsync(id);
            if (song == null)
            {
                return NotFound();
            }
            return Ok(song);
        }

        // GET api/<SongsController>/search/
        [HttpGet("search/{input}")]
        public IActionResult Search(string input)
        {
            var query = odysseyDB.Songs.Where(a => a.NameSong == input || a.NameSong == input || a.Lyrics.Contains(input));
            return Ok(query);
        }

        // DELETE api/<SongsController>/id
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var song = await odysseyDB.Users.FindAsync(id);
            if (song == null)
            {
                return NotFound();
            }

            odysseyDB.Users.Remove(song);
            await odysseyDB.SaveChangesAsync();

            return NoContent();
        }
    }
}
