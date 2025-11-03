using Microsoft.AspNetCore.Mvc;
using ModernWebApp.Backend.Models;

namespace ModernWebApp.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : ControllerBase
    {
        [HttpGet]
        public ActionResult<HomeData> Get()
        {
            var homeData = new HomeData
            {
                Title = "Welcome to Modern Web App",
                Description = "This is the home dashboard with real-time data from the backend.",
                Stats = new List<StatItem>
                {
                    new StatItem { Label = "Total Users", Value = 1250, Trend = "+12%" },
                    new StatItem { Label = "Active Sessions", Value = 89, Trend = "+5%" },
                    new StatItem { Label = "Performance", Value = 94, Trend = "+2%" }
                },
                RecentActivity = new List<ActivityItem>
                {
                    new ActivityItem { Action = "User login", Time = "2 minutes ago", Status = "success" },
                    new ActivityItem { Action = "Data sync", Time = "5 minutes ago", Status = "success" },
                    new ActivityItem { Action = "System update", Time = "1 hour ago", Status = "warning" },
                    new ActivityItem { Action = "Backup completed", Time = "2 hours ago", Status = "success" }
                }
            };

            return Ok(homeData);
        }
    }
}
