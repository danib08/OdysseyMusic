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
    public class UsersController : ControllerBase
    {
        private readonly OdysseyMusicDB odysseyDB;

        public UsersController(OdysseyMusicDB odysseyDB)
        {
            this.odysseyDB = odysseyDB;
        }

        // GET: api/<UsersController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var user = await odysseyDB.Users.ToListAsync();
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var user = await odysseyDB.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // GET api/<UsersController>/5
        [HttpGet("exists/{id}")]
        public async Task<bool> Exists(int id)
        {
            var user = await odysseyDB.Users.FindAsync(id);
            if (user == null)
            {
                return false;
            }
            return true;        
        }

        // POST api/<UsersController>
        [HttpPost]
        public async Task<IActionResult> Post(Users user)
        {
            var newUser = await odysseyDB.Users.AddAsync(user);
            await odysseyDB.SaveChangesAsync();
            return Ok(newUser.Entity);
        }

        // DELETE api/<UsersController>/id
        [HttpDelete("{id}")]
        
        public async Task<IActionResult> Delete(int id)
        {
            var user = await odysseyDB.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            odysseyDB.Users.Remove(user);
            await odysseyDB.SaveChangesAsync();

            return NoContent();
        }
    }
}
