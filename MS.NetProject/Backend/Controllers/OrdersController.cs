using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RapidRoute.Data;
using RapidRoute.Modal.Entities;
using RapidRoute.Modal;
using Microsoft.AspNetCore.Authorization;

using RapidRoute.InterFaces;
using static System.Net.WebRequestMethods;

namespace RapidRoute.Controllers
{
    [Route("api/[controller]/tkn")]
    [ApiController]
    public class OrdersController : ControllerBase
    {

        private readonly ApplicationDbContext dbContext;
        private readonly EmailSender emailSend;

        public OrdersController(ApplicationDbContext dbContext, EmailSender emailSend)
        {
            this.dbContext = dbContext;
            this.emailSend = emailSend;
        }

        [HttpGet]
        [Authorize]
        public IActionResult GetOrders()
        {
            return Ok(dbContext.Orders.ToList());
        }

        [HttpGet]
        [Route("{id}")]
        [Authorize]
        public IActionResult GetOrderById(int id)
        {
            var find = dbContext.Orders.Find(id);
            if (find is null)
            {
                return NotFound();
            }
            return Ok(find);
        }

        [HttpGet]
        [Route("getTrack/{trk}")]
        
        public IActionResult GetOrderByTrk(string trk)
        {
            var find = dbContext.Orders.FirstOrDefault(e => e.TrackingID == trk);
            if (find is null)
            {
                return NotFound();
            }
            return Ok(find);
        }

        [HttpGet]
        [Route("agent/{id}")]
        
        public IActionResult GetOrderByAgentId(int id)
        {
            var find = dbContext.Orders.Where(e => e.AgentId == id);
            if (find is null)
            {
                return NotFound();
            }
            return Ok(find);
        }

        [HttpPost]
        [Route("{id}")]
        [Authorize]
        public IActionResult UpdateOrder(int id, AddOrder addOrder)
        {
            var find = dbContext.Orders.Find(id);
            if (find is null)
            {
                return NotFound();
            }
            find.PhoneNumber = addOrder.PhoneNumber;
            find.Email = addOrder.Email;
            find.TrackingID = addOrder.TrackingID;
            find.AgentId = addOrder.AgentId;
            find.CustomerId = addOrder.CustomerId;
            find.DDate = addOrder.DDate;
            find.ODate = addOrder.ODate;
            find.Destination = addOrder.Destination;
            find.Pickup=addOrder.Pickup;
            find.Name = addOrder.Name;

            dbContext.SaveChanges();
            return Ok(find);
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize]
        public IActionResult DeleteOrder(int id)
        {
            var find = dbContext.Orders.Find(id);
            if (find is null)
            {
                return NotFound();
            }
            dbContext.Orders.Remove(find);
            dbContext.SaveChanges();
            var msg = "Delete ho gya bhai";
            return Ok(msg);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> postOrder(FormOrder order)
        { string trk = Order.getTrackId();
            var obj = new Order()
            {
                Name = order.Name,
                PhoneNumber = order.PhoneNumber,              
                Email = order.Email,
                TrackingID = trk,
                Pickup = order.Pickup,
                Destination = order.Destination,
                ODate = DateOnly.FromDateTime(DateTime.Now),
                DDate = DateOnly.FromDateTime(DateTime.Now).AddDays(5),
                AgentId = order.AgentId,
                CustomerId  = order.CustomerId,

            };
            Customer customer = dbContext.Customers.Find(order.CustomerId);
            await emailSend.SendEmailAsync(customer.Email, "Order Confirmation - Ninja Courier Service", "Hi there!\r\n\r\nThanks for choosing Ninja Courier Service! 🚀 Your order is confirmed, and our team is ready to deliver your package swiftly and securely. Sit back and relax while we handle the rest!\r\n\r\nYour tracking ID for this delivery is: "+trk+". Keep this handy for easy tracking of your package! 📦🛡️\r\n\r\nNinja Courier Service - Delivering with Speed and Stealth! \U0001f977📮");
            Agent agent = dbContext.Agents.Find(order.AgentId);
            await emailSend.SendEmailAsync(agent.Email, "Order Confirmation - Ninja Courier Service", "Hey there!\r\n\r\nReady to rock and roll with your order at Ninja Courier Service! 🚀 Your package is prepped and set for delivery, and I'm geared up to bring it to you swiftly and securely. Let's make this delivery smooth as silk! \r\n\r\nBe set to hit the road with your order from Ninja Courier Service! 🚀 Your package is locked and loaded for pickup at "+order.Pickup+" and destined for "+order.Destination+ ".\r\n\r\nYour tracking ID for this delivery is: "+trk+". Keep this handy for easy tracking of your package! 📦🛡️\r\n\r\nNinja Courier Service - Delivering with Speed and Stealth! \U0001f977📮");
            await emailSend.SendEmailAsync(order.Email, "Order Confirmation - Ninja Courier Service", "Hi there!\r\n\r\nNinja Courier Service! 🚀 Your order is confirmed by "+customer.Name+", and our team is ready to deliver your package swiftly and securely. Sit back and relax while we handle the rest!\r\n\r\nYour tracking ID for this delivery is: "+trk+". Keep this handy for easy tracking of your package! 📦🛡️\r\n\r\nNinja Courier Service - Delivering with Speed and Stealth! \U0001f977📮");
            dbContext.Orders.Add(obj);
            dbContext.SaveChanges();
            return Ok(obj);
        }
    }
}
