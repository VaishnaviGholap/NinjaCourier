using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace RapidRoute.Modal.Entities
{/*
Customer username(FK)
Agent CompanyName(FK)
  */
    public class Order
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Pickup {  get; set; }
        public string Destination { get; set; }
        public DateOnly ODate { get; set; }
        public DateOnly DDate { get; set; }
        public string TrackingID { get; set; }

        [ForeignKey("Customer")]
        public int CustomerId { get; set; }
        [ForeignKey("Agent")]
        public int AgentId { get; set; }
        public static string getTrackId()
        {
            Random random = new Random();

            // Define possible characters for alphanumeric string (excluding digits for first two characters)
            const string alphaChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const string numChars = "0123456789";

            StringBuilder builder = new StringBuilder(10); // Length of 10

            // First character (digit 1-9)
            builder.Append(numChars[random.Next(1, numChars.Length)]);

            // Second character (digit 0-9)
            builder.Append(numChars[random.Next(numChars.Length)]);

            // Remaining 6 characters (alphanumeric)
            for (int i = 0; i < 6; i++)
            {
                builder.Append(alphaChars[random.Next(alphaChars.Length)]);
            }
            builder.Append(numChars[random.Next(numChars.Length)]);

            // Second character (digit 0-9)
            builder.Append(numChars[random.Next(numChars.Length)]);

            string randomString = builder.ToString();
            return randomString;
        }
    }


}
