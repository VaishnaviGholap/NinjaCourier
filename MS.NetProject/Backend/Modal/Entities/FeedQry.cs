using System.ComponentModel.DataAnnotations;

namespace RapidRoute.Modal.Entities
{
    public class FeedQry
    {
        [Key]
        public int FeedbackId { get; set; }
        public DateOnly Date { get; set; }
        public string Category { get; set; }
        public string Ratings { get; set; }
        public string Query { get; set; }

        public string Username { get; set; }

        public string Email { get; set; }
    }
}
