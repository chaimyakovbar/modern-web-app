namespace ModernWebApp.Backend.Models
{
    public class CICDData
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public List<Pipeline> Pipelines { get; set; } = new List<Pipeline>();
        public List<Deployment> RecentDeployments { get; set; } = new List<Deployment>();
    }

    public class Pipeline
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string Duration { get; set; } = string.Empty;
        public string LastRun { get; set; } = string.Empty;
        public string Branch { get; set; } = string.Empty;
    }

    public class Deployment
    {
        public string Environment { get; set; } = string.Empty;
        public string Version { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string Time { get; set; } = string.Empty;
    }
}
