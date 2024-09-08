using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RapidRoute.Data;
using RapidRoute.Modal.Entities;
using RapidRoute.Modal;
using Twilio.Clients;
using Twilio.Types;
using Twilio.Rest.Api.V2010.Account;
using RapidRoute.OTPService;
using Microsoft.EntityFrameworkCore;
using RapidRoute.PasswordEncrypt;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace RapidRoute.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    { 

        private readonly ApplicationDbContext dbContext;
        private readonly IService service;
        private readonly IConfiguration _configuration;

        //private readonly ITwilioRestClient client;

        public CustomersController(ApplicationDbContext dbContext, IService service, IConfiguration _configuration)
        {
            this.dbContext = dbContext;
            this.service = service;
            _configuration = _configuration;
        }

        [HttpGet]
        [Authorize]
        [Route("/tkn")]
        public IActionResult GetCustomer()
        {
            return Ok(dbContext.Customers.ToList());
        }
        //public async Task<ActionResult<IEnumerable<Complaint>>> GetComplaints()
        //{
        //    return await _context.Complaints.ToListAsync();
        //}

        [HttpPost]
        [Route("/login")]
        public  ActionResult CustomerLogin([FromBody]Login login)
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

            var encrypt = Encryption.Encrypt(login.password);

            var find = dbContext.Customers.Where(a=> a.Username== login.username && a.Password == encrypt).ToList();
            if (find.Count == 0)
            {
                string msg = "Username/Password is Invalid";
                return NotFound(msg);
            }
            return  Ok(new { token = tokenValue, user = find });
        }

        [HttpGet]
        [Route("/tkn/{id}")]
        [Authorize]
        public IActionResult GetCustomerByID(int id)
        {
            var find = dbContext.Customers.Find(id);
            if (find is null)
            {
                return NotFound();
            }
            return Ok(find);
        }

        [HttpGet]
        [Route("forget/{username}")]

        public async Task<IActionResult> ForgetPass(string username)
        {
            
            Random random = new Random();
            int num = random.Next(100000, 999999);
            string otp = num.ToString();
           

            string smsMessage = "Your 6's digit OTP => " + otp;
            var find = dbContext.Customers.FirstOrDefault(a => a.Username == username);
            if (find is null)
            {
                return NotFound(new {msg = "User not found."});
            }
            string toNum = find.PhoneNumber.ToString();
            toNum = "+91" + toNum;
            find.Otp = num;
            await service.SendOtp(toNum, smsMessage);
            string n = find.PhoneNumber.ToString();
            n=n.Substring(n.Length - 4);
            dbContext.SaveChanges();
            return Ok(new { msg = "We have Send the Otp on your mobile number +91-XXXXXX"+n });
        }

        [HttpPost]
        [Route("otp/{username}")]
        public  IActionResult CheckOtp(OtpClass otpClass,string username)
        {
            int num = Convert.ToInt32(otpClass.Otp);
            var find = dbContext.Customers.FirstOrDefault(a => a.Username == username);
            if (find is null)
            {
                return NotFound(new { msg = "User not found." });
            }

            if (find.Otp == num)
            {
                return Ok(new { msg = "Your Password is " + Encryption.Decrypt(find.Password) + "." });
            }
            return NotFound(new { msg = "Your OTP is not matched" });
        }
        


            [HttpPost]
        [Route("/tkn/{id}")]
        [Authorize]
        public IActionResult UpdateCustomer(int id, AddCustomer addCustomer)
        {

            var find = dbContext.Customers.Find(id);
            var encrypt = Encryption.Encrypt(addCustomer.Password);
            if (find is null)
            {
                return NotFound();
            }
            find.Name = addCustomer.Name;
            find.Username = addCustomer.Username;
            find.Password = encrypt;
            find.Email = addCustomer.Email;
            
            find.PhoneNumber = addCustomer.PhoneNumber;
            find.Address = addCustomer.Address;
            
            dbContext.SaveChanges();
            return Ok(find);
        }

        [HttpDelete]
        [Route("/tkn/{id}")]
        [Authorize]
        public IActionResult DeleteCustomer(int id)
        {
            var find = dbContext.Customers.Find(id);
            if (find is null)
            {
                return NotFound();
            }
            dbContext.Customers.Remove(find);
            dbContext.SaveChanges();
            var msg = "Delete ho gya bhai";
            return Ok(msg);
        }

        [HttpPost]
        public IActionResult postCustomer(AddCustomer customer)
        {
            var encrypt = Encryption.Encrypt(customer.Password);
            var obj = new Customer()
            {
                Name = customer.Name,
                PhoneNumber = customer.PhoneNumber,
                Address = customer.Address,
                Username = customer.Username,
                Password = encrypt,
                Email = customer.Email,
                Otp = 0
            };

            dbContext.Customers.Add(obj);
            dbContext.SaveChanges();
            return Ok(obj);
        }
    }
}
