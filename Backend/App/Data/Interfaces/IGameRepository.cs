using Data.Models.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Interfaces;

public interface IGameRepository
{

    Task AddUserToGame(UserDto user, int gameId, KindOfGames kindOfGames);

    Task DeleteUserToGame(UserDto user, int gameId, KindOfGames kindOfGames);

    Task<GameDto?> GetGameAsync(int gameId);

}
public enum KindOfGames
{
    Viewed,
    Liked
}
