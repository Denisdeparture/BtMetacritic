using BuisnessLogic.Models.SteamApi;
using BuisnessLogic.Models.SteamApi.Group;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuisnessLogic.Interfaces
{
    public interface ISteamApi
    {
        public Task<GameInfoModel> GetGameByIdAsync(string id);
        public Task<IList<GameItemModel>> GetGameByNameAsync(string name, int maxCount = 1, string country = "en");

    }
}
