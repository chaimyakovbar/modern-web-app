using Microsoft.AspNetCore.Mvc;
using ModernWebApp.Backend.Models;

namespace ModernWebApp.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TerracesController : ControllerBase
    {
        [HttpGet]
        public ActionResult<TerracesData> Get()
        {
            var terracesData = new TerracesData
            {
                Title = "Terraces Management",
                Description = "Monitor and manage your terrace environments with real-time data.",
                Terraces = new List<Terrace>
                {
                    new Terrace 
                    { 
                        Id = 1, 
                        Name = "Garden Terrace", 
                        Location = "North Building", 
                        Status = "active", 
                        Temperature = 22, 
                        Humidity = 65, 
                        Plants = 12, 
                        LastWatered = "2 hours ago" 
                    },
                    new Terrace 
                    { 
                        Id = 2, 
                        Name = "Rooftop Terrace", 
                        Location = "Main Building", 
                        Status = "maintenance", 
                        Temperature = 25, 
                        Humidity = 58, 
                        Plants = 8, 
                        LastWatered = "1 day ago" 
                    },
                    new Terrace 
                    { 
                        Id = 3, 
                        Name = "Balcony Garden", 
                        Location = "East Wing", 
                        Status = "active", 
                        Temperature = 20, 
                        Humidity = 70, 
                        Plants = 15, 
                        LastWatered = "3 hours ago" 
                    },
                    new Terrace 
                    { 
                        Id = 4, 
                        Name = "Greenhouse", 
                        Location = "South Building", 
                        Status = "active", 
                        Temperature = 26, 
                        Humidity = 75, 
                        Plants = 25, 
                        LastWatered = "1 hour ago" 
                    }
                },
                Weather = new WeatherInfo
                {
                    Current = "Sunny",
                    Temperature = 24,
                    Humidity = 60,
                    Forecast = new List<Forecast>
                    {
                        new Forecast { Day = "Today", Condition = "Sunny", High = 26, Low = 18 },
                        new Forecast { Day = "Tomorrow", Condition = "Partly Cloudy", High = 24, Low = 16 },
                        new Forecast { Day = "Wednesday", Condition = "Rainy", High = 20, Low = 14 },
                        new Forecast { Day = "Thursday", Condition = "Cloudy", High = 22, Low = 15 }
                    }
                }
            };

            return Ok(terracesData);
        }
    }
}
