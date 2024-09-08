using Microsoft.EntityFrameworkCore;
using RapidRoute.Modal.Entities;

namespace RapidRoute.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<Agent> Agents { get; set; }

        public DbSet<Customer> Customers { get; set; }

        public DbSet<Admin> Admins { get; set; }

        public DbSet<Order> Orders { get; set; }

        public DbSet<Feedback> Feedbacks { get; set; }

        public DbSet<FeedQry> FeedQries { get; set; }

    }
}
