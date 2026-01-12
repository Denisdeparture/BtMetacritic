namespace Models.Group
{
    record class Screenshot
    {
        public int id { get; set; }
        public string path_thumbnail { get; set; }
        public string path_full { get; set; }
    }
    record class ReleaseDate
    {
        public bool coming_soon { get; set; }
        public string date { get; set; }
    }
    record class Genre
    {
        public string id { get; set; }
        public string description { get; set; }
    }
    record class Platforms
    {
        public bool windows { get; set; }
        public bool mac { get; set; }
        public bool linux { get; set; }
    }
}