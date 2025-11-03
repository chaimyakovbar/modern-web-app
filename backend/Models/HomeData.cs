namespace ModernWebApp.Backend.Models
{
    public class HomeData
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public List<StatItem> Stats { get; set; } = new List<StatItem>();
        public List<ActivityItem> RecentActivity { get; set; } = new List<ActivityItem>();
    }

    public class StatItem
    {
        public string Label { get; set; } = string.Empty;
        public int Value { get; set; }
        public string Trend { get; set; } = string.Empty;
    }

    public class ActivityItem
    {
        public string Action { get; set; } = string.Empty;
        public string Time { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
    }
}
