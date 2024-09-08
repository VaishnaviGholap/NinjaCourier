using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RapidRoute.Data;
using RapidRoute.Modal.Entities;
using RapidRoute.Modal;
using Microsoft.AspNetCore.Authorization;

namespace RapidRoute.Controllers
{
    [Route("api/[controller]/tkn")]
    [ApiController]

    public class FeedBacksController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public FeedBacksController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        [Authorize]
        public IActionResult GetFeedback()
        {
            return Ok(dbContext.FeedQries.ToList());
        }


        [HttpDelete]
        [Route("{id}")]
        [Authorize]
        public IActionResult DeleteFeedback(int id)
        {
            var find = dbContext.FeedQries.Find(id);
            if (find is null)
            {
                return NotFound();
            }
            dbContext.FeedQries.Remove(find);
            dbContext.SaveChanges();
            var msg = "Delete ho gya bhai";
            return Ok(msg);
        }

        [HttpPost]
        
        public IActionResult postFeedback(AddFeedBack addFeedback)
        {
            var obj = new FeedQry()
            {
               
                Date = DateOnly.FromDateTime(DateTime.Now),
                Category = addFeedback.Category,
                Ratings = "4",
                Query = addFeedback.Query,
                Username = addFeedback.Username,
                Email = addFeedback.Email

            };

            dbContext.FeedQries.Add(obj);
            dbContext.SaveChanges();
            return Ok(obj);
        }
    }
}
