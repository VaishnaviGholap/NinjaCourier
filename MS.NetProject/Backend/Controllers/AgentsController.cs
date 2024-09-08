using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using RapidRoute.Data;
using RapidRoute.Modal;
using RapidRoute.Modal.Entities;
using RapidRoute.OTPService;
using RapidRoute.PasswordEncrypt;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace RapidRoute.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AgentsController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;
        private readonly IConfiguration _configuration; //jwt token
        private readonly IService service;

        public AgentsController(ApplicationDbContext dbContext, IConfiguration _configuration, IService service) 
        {
            this.dbContext = dbContext;
            this._configuration = _configuration;
            this.service = service;
        }

        [HttpGet]
        [Authorize]
        [Route("/tkn")]
        public IActionResult GetAgent() {
            
            //var claims = new[]
            //{
            //    new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"] ),
            //    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString() ),
            //    new Claim("UserId","Abdul" )             
            //};
            //var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            //var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            //var token = new JwtSecurityToken(
            //    _configuration["Jwt:Issuer"],
            //    _configuration["Jwt:Audience"],
            //    claims,
            //    expires: DateTime.UtcNow.AddMinutes(20),
            //    signingCredentials: credentials
            //    );
            //string tokenValue = new JwtSecurityTokenHandler().WriteToken(token);
            return Ok(dbContext.Agents.ToList() );
        }
        [HttpPost]
        [Route("login")]
        public ActionResult AgentLogin([FromBody] Login login)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"] ),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString() ),
                new Claim("UserId","Abdul" )
            };
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.UtcNow.AddMinutes(20),
                signingCredentials: credentials
                );
            string tokenValue = new JwtSecurityTokenHandler().WriteToken(token);
            var decrypt = Encryption.Encrypt(login.password);
            var find = dbContext.Agents.Where(a => a.Username == login.username && a.Password == decrypt).ToList();
            if (find.Count == 0)
            {
                string msg = "Username/Password is Invalid";
                return NotFound(msg);
            }
            return Ok(new {token= tokenValue, user=find});
        }

        [HttpGet]
        [Route("/tkn/{id}")]
        [Authorize]
        public IActionResult GetAgentByName(int id) 
        {
            var find = dbContext.Agents.Find(id);
            if(find is null)
            {
                return NotFound();
            }
            var decrypt = Encryption.Decrypt(find.Password);
            find.Password = decrypt;
            return Ok(find);
        }

        [HttpPost]
        [Route("/tkn/{id}")]
       
        public IActionResult UpdateAgent(int id, AddAgent addAgent)
        {
            var find = dbContext.Agents.Find(id);
            if(find is null)
            {
                var msg = "not found";
                return NotFound(msg);
            }
            var encrypt = Encryption.Encrypt(addAgent.Password);
            find.Username = addAgent.Username;
            find.Password = encrypt;
            find.Email = addAgent.Email;
            find.AgentName = addAgent.AgentName;
            find.PhoneNumber = addAgent.PhoneNumber;
            find.Address = addAgent.Address;
            find.CompanyName = addAgent.CompanyName;
            find.Ratings = addAgent.Ratings;
            dbContext.SaveChanges();
            return Ok(find);
        }

        [HttpDelete]
        [Route("{id}")]
        
        public IActionResult DeleteAgent(int id)
        {
            var find = dbContext.Agents.Find(id);
            if (find is null)
            {
                return NotFound();
            }
            dbContext.Agents.Remove(find);
            dbContext.SaveChanges();
            var msg =  "Delete ho gya bhai";
            return Ok(msg);
        }

        [HttpGet]
        [Route("forget/{username}")]

        public async Task<IActionResult> ForgetPass(string username)
        {

            Random random = new Random();
            int num = random.Next(100000, 999999);
            string otp = num.ToString();


            string smsMessage = "Your 6's digit OTP => " + otp;
            var find = dbContext.Agents.FirstOrDefault(a => a.Username == username);
            if (find is null)
            {
                return NotFound(new { msg = "User not found." });
            }
            string toNum = find.PhoneNumber.ToString();
            toNum = "+91" + toNum;
            find.Otp = num;
            await service.SendOtp(toNum, smsMessage);
            string n = find.PhoneNumber.ToString();
            n = n.Substring(n.Length - 4);
            dbContext.SaveChanges();
            return Ok(new { msg = "We have Send the Otp on your mobile number +91-XXXXXX" + n });
        }

        [HttpPost]
        [Route("otp/{username}")]
        public IActionResult CheckOtp(OtpClass otpClass, string username)
        {
            int num = Convert.ToInt32(otpClass.Otp);
            var find = dbContext.Agents.FirstOrDefault(a => a.Username == username);
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
       
        public IActionResult postAgent(FormAgent agent) {
            var pass = agent.Password;
            var encrypt = Encryption.Encrypt(pass);
            var obj = new Agent()
            {
                AgentName = agent.AgentName,
                CompanyName = agent.CompanyName,
                PhoneNumber = agent.PhoneNumber,
                Address = agent.Address,
                Username = agent.Username,
                Password = encrypt ,
                Email = agent.Email,
                Ratings = "4",
                Otp =0
            };

            dbContext.Agents.Add(obj);
            dbContext.SaveChanges();
            return Ok(obj);
        }
    }
}
