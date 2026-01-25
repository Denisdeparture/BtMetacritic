using Data.Models.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Interfaces;

public interface IGameRepository
{

    Task AddUserToGame(UserDto user, GameDto itemModel, KindOfGames kindOfGames);

    Task DeleteUserToGame(UserDto user, GameDto itemModel, KindOfGames kindOfGames);

    Task<GameDto?> GetGameAsync(GameDto gameItem);

}
public enum KindOfGames
{
    Viewed,
    Liked
}
