using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BuisnessLogic.Models.SteamApi.Group;
using Data;
using Data.Interfaces;
using Data.Models.Dto;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

namespace BuisnessLogic.Realization;
public class UserGameRepository(IDbContextFactory<MyAppContext> dbContext) : IGameRepository
{
    public async Task AddUserToGame(UserDto user, GameDto itemModel,  KindOfGames kindOfGames)
    {
        var context = await dbContext.CreateDbContextAsync();

        var game = await GetGameAsync(itemModel);

        if (game is null)
        {
            return;
        }

        if (kindOfGames == KindOfGames.Liked)
        {
            game.UserLikedIt!.Add(user);
            user.GamesWhichLiked!.Add(game);
        }
        if (kindOfGames == KindOfGames.Viewed)
        {
            game.UserViewedIt!.Add(user);
            user.GamesWhichLiked!.Add(game);
        }

        context.Entry(user).CurrentValues.SetValues(user);

        context.Users.Update(user);

        context.Entry(game).CurrentValues.SetValues(game);

        context.Games.Update(game);

        context.SaveChanges();

    }
    public async Task DeleteUserToGame(UserDto user, GameDto itemModel, KindOfGames kindOfGames)
    {
        var context = await dbContext.CreateDbContextAsync();


        var game = await GetGameAsync(itemModel);

        if(game is null)
        {
            return;
        }

        if (kindOfGames == KindOfGames.Liked)
        {
            game.UserLikedIt!.Remove(user);

            user.GamesWhichLiked!.Remove(game);
        }
        if (kindOfGames == KindOfGames.Viewed)
        {
            game.UserViewedIt!.Remove(user);

            user.GamesWhichViewed!.Remove(game);
        }
        context.Entry(user).CurrentValues.SetValues(user);

        context.Users.Update(user);

        context.Entry(game).CurrentValues.SetValues(game);

        context.Games.Update(game);

        context.SaveChanges();

    }
    public async Task<GameDto?> GetGameAsync(GameDto gameItem)
    {
        var context = await dbContext.CreateDbContextAsync();

        var game = context.Games.Include(x => x.UserViewedIt).Include(x => x.UserLikedIt).Where(x => x.Id == gameItem.Id).SingleOrDefault();

        if(game is null)
        {
            context.Games.Add(gameItem);
            context.SaveChanges();
        }

        return game;
    }
}

