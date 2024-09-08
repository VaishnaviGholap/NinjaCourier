using System.ComponentModel.DataAnnotations;

namespace RapidRoute.Modal.Entities
{
    public class Admin
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }       
        public string PhoneNumber { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }

        public int Otp { get; set; }
    }
}
