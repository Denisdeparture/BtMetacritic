using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data;
using Data.Interfaces;
using Data.Models.Dto;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

namespace BuisnessLogic.Realization;
public class UserGameRepository(IDbContextFactory<MyAppContext> dbContext) : IGameRepository
{
    public async Task AddUserToGame(UserDto user, int gameId, KindOfGames kindOfGames)
    {
        var context = await dbContext.CreateDbContextAsync();

        context.Entry(user).State = EntityState.Modified;

        var game = await GetGameAsync(gameId);

        if (game is null)
        {
            return;
        }

        if (kindOfGames == KindOfGames.Liked)
        {
            game.UserLikedIt!.Add(user);
        }
        if (kindOfGames == KindOfGames.Viewed)
        {
            game.UserViewedIt!.Add(user);
        }

        context.SaveChanges();

    }
    public async Task DeleteUserToGame(UserDto user, int gameId, KindOfGames kindOfGames)
    {
        var context = await dbContext.CreateDbContextAsync();

        context.Entry(user).State = EntityState.Modified;

        var game = await GetGameAsync(gameId);

        if(game is null)
        {
            return;
        }

        if (kindOfGames == KindOfGames.Liked)
        {
            game.UserLikedIt!.Remove(user);
        }
        if (kindOfGames == KindOfGames.Viewed)
        {
            game.UserViewedIt!.Remove(user);
        }

        context.SaveChanges();

    }
    public async Task<GameDto?> GetGameAsync(int gameId)
    {
        var context = await dbContext.CreateDbContextAsync();

        var game = context.Games.Where(x => x.Id == gameId).SingleOrDefault();

        return game;
    }
}

