using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RapidRoute.Modal.Entities
{
    /*
    ID
    Customer username(FK)
    Date
    Category
    ratings
    Query
    */
    public class Feedback
    {

        [Key]
        public int FeedbackId { get; set; }
        public DateTime Date { get; set; }
        public string Category { get; set; }
        public string Ratings { get; set; }
        public string Query { get; set; }

        [ForeignKey("Customer")]
        public string CustomerId { get; set; }
       
    }
}
