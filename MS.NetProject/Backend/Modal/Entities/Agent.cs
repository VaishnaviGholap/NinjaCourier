using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace RapidRoute.Modal.Entities
{
    public class Agent
    {
        [Key]
        public int AgentId { get; set; }
        
        public string CompanyName { get; set; }

        public string AgentName { get; set; }

        public string PhoneNumber { get; set; }

        public string Address { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public string Ratings { get; set; }

        public int Otp { get; set; }
    }
}
