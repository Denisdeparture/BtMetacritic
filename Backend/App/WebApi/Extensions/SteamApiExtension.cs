using System.Threading.Tasks;
using BuisnessLogic.Models.SteamApi;
using BuisnessLogic.Services;
using Data.Models.Dto;

namespace WebApi.Extensions;

public static class SteamApiExtension
{
    public static async Task<IList<GameInfoModel>> GetInfoAboutGames(this SteamApi steamApi, List<GameDto> list)
    {
        var listinfo = new List<GameInfoModel>();

        foreach(var gd in list)
        {
            if (string.IsNullOrWhiteSpace(gd.Title))
            {
                continue;
            }
            var games = await steamApi.GetGameByNameAsync(gd.Title);

            var item = games.FirstOrDefault();

            if (item is null)
            {
                continue;
            }
            var game = await steamApi.GetGameByIdAsync(item.id.ToString());

            listinfo.Add(game);
        }

        return listinfo;
    }
}
