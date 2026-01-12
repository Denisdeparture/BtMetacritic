using Models;
using System;
using System.Net.Http.Json;
using System.Web;
namespace Services
{
    public class SteamApi(HttpClient httpClient)
    {
        private string steamUrl = "https://store.steampowered.com/api";
        public async Task<GameInfoModel> GetGameByIdAsync(string id)
        {
            var urib = new UriBuilder($"{steamUrl}/appdetails");

            var query = HttpUtility.ParseQueryString(urib.Query);

            query["appids"] = id;

            urib.Query = query.ToString();

            string requestUri = urib.ToString();

            var json = await httpClient.GetAsync(requestUri);

            if (!json.IsSuccessStatusCode) throw new Exception("Status wasn`t success");

            var model = await json.Content.ReadFromJsonAsync<GameInfoModel>();

            if (model is null) throw new NullReferenceException();

            return model;
        }
        public async Task GetGameByNameAsync(string name, int maxCount = 1)
        {
            var urib = new UriBuilder($"{steamUrl}/storesearch");

            var query = HttpUtility.ParseQueryString(urib.Query);

            query["term"] = name;

            query["max_results"] = maxCount.ToString();

            urib.Query = query.ToString();

            string requestUri = urib.ToString();

            var json = await httpClient.GetAsync(requestUri);

            if (!json.IsSuccessStatusCode) throw new Exception("Status wasn`t success");


        }
    }

}


public class Item
{
    public string type { get; set; }
    public string name { get; set; }
    public int id { get; set; }
    public Price price { get; set; }
    public string tiny_image { get; set; }
    public string metascore { get; set; }
    public Platforms platforms { get; set; }
    public bool streamingvideo { get; set; }
    public string controller_support { get; set; }
}

public class Platforms
{
    public bool windows { get; set; }
    public bool mac { get; set; }
    public bool linux { get; set; }
}

public class Price
{
    public string currency { get; set; }
    public int initial { get; set; }
    public int final { get; set; }
}

public class Items
{
    public int total { get; set; }
    public List<Item> items { get; set; }
}















