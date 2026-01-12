using Models.Group;

namespace Models
{
    public class GameInfoModel
    {
        public string type { get; set; }
        public string name { get; set; }
        public int steam_appid { get; set; }
        public int required_age { get; set; }
        public bool is_free { get; set; }
        public List<int> dlc { get; set; }
        public string detailed_description { get; set; }
        public string about_the_game { get; set; }
        public string short_description { get; set; }
        public string supported_languages { get; set; }
        public string header_image { get; set; }
        public string capsule_image { get; set; }
        public string capsule_imagev5 { get; set; }
        public string website { get; set; }
        public List<string> developers { get; set; }
        public List<string> publishers { get; set; }
        public List<int> packages { get; set; }
        public Platforms platforms { get; set; }
        public List<Category> categories { get; set; }
        public List<Genre> genres { get; set; }
        public List<Screenshot> screenshots { get; set; }
        public ReleaseDate release_date { get; set; }
    }
}