using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuisnessLogic.Models.SteamApi.Group
{

    public class GameItemModel
    {
        public string name { get; set; }
        public int id { get; set; }

    }

    public class GameItemsModel
    {
        public int total { get; set; }
        public List<GameItemModel> items { get; set; } = null!;
    }


}
