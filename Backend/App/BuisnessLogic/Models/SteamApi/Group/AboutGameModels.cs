namespace  BuisnessLogic.Models.SteamApi.Group
{
    public record class Screenshot
    {
        public int id { get; set; }
        public string? path_thumbnail { get; set; }
        public string? path_full { get; set; }
    }
    public record class ReleaseDate
    {
        public bool coming_soon { get; set; }
        public string? date { get; set; }
    }
    public record class Genre
    {
        public string id { get; set; } = null!;
        public string? description { get; set; }
    }
    public record class Platforms
    {
        public bool windows { get; set; }
        public bool mac { get; set; }
        public bool linux { get; set; }
    }
    public record class Price
    {
        public string? currency { get; set; }
        public int initial { get; set; }
        public int final { get; set; }
    }

}