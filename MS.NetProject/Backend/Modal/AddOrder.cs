using System.ComponentModel.DataAnnotations.Schema;

namespace RapidRoute.Modal
{
    public class AddOrder
    {
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Pickup { get; set; }
        public string Destination { get; set; }

        public DateOnly ODate { get; set; }

        public DateOnly DDate { get; set; }

        public string TrackingID { get; set; }

        [ForeignKey("Customer")]
        public int CustomerId { get; set; }

        [ForeignKey("Agent")]
        public int AgentId { get; set; }
    }
}
