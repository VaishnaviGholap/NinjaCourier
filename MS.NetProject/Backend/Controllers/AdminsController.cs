using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RapidRoute.Data;
using RapidRoute.Modal.Entities;
using RapidRoute.Modal;
using RapidRoute.InterFaces;

using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using RapidRoute.PasswordEncrypt;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace RapidRoute.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminsController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;
        private readonly EmailSender emailSend;
        private readonly IConfiguration _configuration;

        public AdminsController(ApplicationDbContext dbContext, EmailSender emailSend, IConfiguration _configuration)
        {
            this.dbContext = dbContext;
            this.emailSend = emailSend;
            _configuration = _configuration;
        }

        [HttpPost]
        [Route("login")]
        public ActionResult AdminLogin([FromBody] Login login)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, "JwtSubject" ),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString() ),
                new Claim("UserId","Abdul" )
            };
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("HumCharBhaiAurCharoTabahiOrHaCheetaHiKehde007219827JhingaLalaPomPom"));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
               "JwtIssuer",
                "JwtAudience",
                claims,
                expires: DateTime.UtcNow.AddMinutes(20),
                signingCredentials: credentials
                );
            string tokenValue = new JwtSecurityTokenHandler().WriteToken(token);
            
            var find = dbContext.Admins.Where(a => a.Username == login.username && a.Password == login.password).ToList();
            if (find.Count == 0)
            {
                string msg = "Username/Password is Invalid";
                return NotFound(msg);
            }
            return Ok(new { token = tokenValue, user = find });
        }

        [HttpGet]
        public async Task<IActionResult> GetAdmin()
        {
            //Random random = new Random();
            //int num = random.Next(100000, 999999);
            //string otp = num.ToString();
            //await emailSend.SendEmailAsync("abdulsheakh043@gmail.com", "axy", "Welcome to our portal\nYour OTP : "+otp);
                var admins = dbContext.Admins.ToList();
                return Ok(admins);           
        }
        //http://localhost:portNumber/api/Admins/23
        [HttpGet]
        [Route("{id}")]
        public IActionResult GetAdminByID(int id)
        {
            var find = dbContext.Admins.Find(id);
            if (find is null)
            {
                return NotFound();
            }
            return Ok(find);
        }

        [HttpPost]
        [Route("{id}")]
        public IActionResult UpdateAdmin(int id, AddAdmin addAdmin)
        {
            var find = dbContext.Admins.Find(id);
            if (find is null)
            {
                return NotFound();
            }
            find.Username = addAdmin.Username;
            find.Password = addAdmin.Password;
            find.Email = addAdmin.Email;
           
            find.PhoneNumber = addAdmin.PhoneNumber;
            find.Name = addAdmin.Name;
            dbContext.SaveChanges();
            return Ok(find);
        }

        [HttpPost]
        [Route("delete/{id}")]
        public IActionResult DeleteAdmin(int id)
        {
            var find = dbContext.Admins.Find(id);
            if (find is null)
            {
                return NotFound();
            }
            dbContext.Admins.Remove(find);
            dbContext.SaveChanges();
            var msg = "Delete ho gya bhai";
            return Ok(msg);
        }

        [HttpPost]
        public async Task<IActionResult> postAdmin(AddAdmin admin)
        {
            //public async Task<IActionResult> GetAdmin()
            //{
            //    await emailSend.SendEmailAsync("abdulsheakh043@gmail.com", "axy", "Welcome to our portal");
            //    var admins = dbContext.Admins.ToList();
            //    return Ok(admins);
            //}
            var obj = new Admin()
            {

                PhoneNumber = admin.PhoneNumber,

                Username = admin.Username,
                Password = admin.Password,
                Email = admin.Email,
                Name = admin.Name,
                Otp = 0
            };
            await emailSend.SendEmailAsync(admin.Email, "This is a testing mail.", "Hello " + admin.Name +"\n\tWelcome to our portal");
            dbContext.Admins.Add(obj);
            dbContext.SaveChanges();
            return Ok(obj);
        }
    }
}
