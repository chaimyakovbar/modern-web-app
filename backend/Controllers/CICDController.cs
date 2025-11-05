using Microsoft.AspNetCore.Mvc;
using ModernWebApp.Backend.Models;
using System;

namespace ModernWebApp.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CICDController : ControllerBase
    {
        [HttpGet]
        public ActionResult<CICDData> Get()
        {
            var cicdData = new CICDData
            {
                Title = "CI/CD Pipeline",
                Description = "Continuous Integration and Deployment dashboard with real-time status.",
                Pipelines = new List<Pipeline>
                {
                    new Pipeline 
                    { 
                        Id = 1, 
                        Name = "Frontend Build", 
                        Status = "success", 
                        Duration = "2m 34s", 
                        LastRun = "5 minutes ago", 
                        Branch = "main" 
                    },
                    new Pipeline 
                    { 
                        Id = 2, 
                        Name = "Backend Tests", 
                        Status = "running", 
                        Duration = "1m 12s", 
                        LastRun = "Currently running", 
                        Branch = "feature/auth" 
                    },
                    new Pipeline 
                    { 
                        Id = 3, 
                        Name = "Deployment", 
                        Status = "failed", 
                        Duration = "4m 56s", 
                        LastRun = "1 hour ago", 
                        Branch = "main" 
                    },
                    new Pipeline 
                    { 
                        Id = 4, 
                        Name = "Security Scan", 
                        Status = "success", 
                        Duration = "3m 21s", 
                        LastRun = "30 minutes ago", 
                        Branch = "main" 
                    }
                },
                RecentDeployments = new List<Deployment>
                {
                    new Deployment { Environment = "Production", Version = "v1.2.3", Status = "success", Time = "2 hours ago" },
                    new Deployment { Environment = "Staging", Version = "v1.2.4", Status = "success", Time = "1 hour ago" },
                    new Deployment { Environment = "Development", Version = "v1.2.5", Status = "running", Time = "30 minutes ago" },
                    new Deployment { Environment = "Testing", Version = "v1.2.6", Status = "success", Time = "15 minutes ago" }
                }
            };

            return Ok(cicdData);
        }

        // Minimal POST endpoints so frontend POSTs won't 404
        [HttpPost("runs")]
        public IActionResult CreateRuns([FromBody] object payload)
        {
            return Ok(new
            {
                runId = Guid.NewGuid().ToString(),
                status = "queued",
                received = payload
            });
        }

        [HttpPost("single-run")]
        public IActionResult CreateSingleRun([FromBody] object payload)
        {
            return Ok(new
            {
                runId = Guid.NewGuid().ToString(),
                status = "queued",
                received = payload
            });
        }
    }
}
