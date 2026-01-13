using BuisnessLogic.Models.SteamApi;
using BuisnessLogic.Models.SteamApi.Group;
using CodeGenerator.Attributes;
using System;
using System.Net.Http.Json;
using System.Web;
namespace BuisnessLogic.Services
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

            if (model is null) throw new NullReferenceException("Model with api was null");

            return model;
        }
        public async Task<IList<GameItemModel>> GetGameByNameAsync(string name, int maxCount = 1, string country = "en")
        {
            var urib = new UriBuilder($"{steamUrl}/storesearch");

            var query = HttpUtility.ParseQueryString(urib.Query);

            query["term"] = name;

            query["max_results"] = maxCount.ToString();
            query["l"] = country;
            query["cc"] = country.ToUpper();

            urib.Query = query.ToString();

            string requestUri = urib.ToString();

            var json = await httpClient.GetAsync(requestUri);

            if (!json.IsSuccessStatusCode) throw new Exception("Status wasn`t success");

            var model = await json.Content.ReadFromJsonAsync<GameItemsModel>();

            if (model is null) throw new NullReferenceException("Model with api was null");

            return model.items;

        }
    }

}














