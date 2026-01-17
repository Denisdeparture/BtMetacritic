using Data.Models.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Interfaces
{
    public interface IGameRepository
    {
        public List<GameDto> GetLikedGamesOnUser(int userId);

        public void AddGameToLikedUser(GameDto game, int userId);

        public void DeleteGameToLikedUser(int userId, int gameId);
    }
}
