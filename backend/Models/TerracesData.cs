namespace ModernWebApp.Backend.Models
{
    public class TerracesData
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public List<Terrace> Terraces { get; set; } = new List<Terrace>();
        public WeatherInfo Weather { get; set; } = new WeatherInfo();
    }

    public class Terrace
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public int Temperature { get; set; }
        public int Humidity { get; set; }
        public int Plants { get; set; }
        public string LastWatered { get; set; } = string.Empty;
    }

    public class WeatherInfo
    {
        public string Current { get; set; } = string.Empty;
        public int Temperature { get; set; }
        public int Humidity { get; set; }
        public List<Forecast> Forecast { get; set; } = new List<Forecast>();
    }

    public class Forecast
    {
        public string Day { get; set; } = string.Empty;
        public string Condition { get; set; } = string.Empty;
        public int High { get; set; }
        public int Low { get; set; }
    }
}
