using System.ComponentModel.DataAnnotations.Schema;

namespace RapidRoute.Modal
{
    public class AddFeedBack
    {
       
        public string Category { get; set; }
       
        public string Query { get; set; }

        public string Username { get; set; }

        public string Email { get; set; }

    }
}
