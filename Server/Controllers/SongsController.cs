using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MusixMatch_API;
using MusixMatch_API.APIMethods.Artist;
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
            var user = await odysseyDB.Songs.ToListAsync();
            return Ok(user);
        }

        // GET api/<SongsController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var user = await odysseyDB.Songs.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // GET api/<SongsController>/search/
        [HttpGet("search/{input}")]
        public IActionResult Search(string input)
        {
            var query = odysseyDB.Songs.Where(a => a.NameSong == input || a.NameSong == input || a.Lyrics.Contains(input));
            return Ok(query);
        }

        // POST api/<SongsController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // DELETE api/<SongsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
