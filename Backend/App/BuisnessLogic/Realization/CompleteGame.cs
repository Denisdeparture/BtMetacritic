using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CodeGenerator.Data;
using Data;
using Data.Models.Dto;
using Microsoft.EntityFrameworkCore;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace UnitOfWorkUpgrade.Realization;

// it is not singleton service
public class CompleteGame(IWorker userWorker) : IWorker
{
    private int NowUserId { get; set; }
    public void SetUserId(int id) => NowUserId = id;
    public async Task AddAsync(object obj)
    {
        GameDto data = (GameDto)obj;

        var user = await GetUserInfo() as UserDto ?? throw new NullReferenceException("It is not user type");

        user.GamesWhichLiked!.Add(data);

        userWorker.UpdateAsync(NowUserId, user);
    }
    public async Task DeleteAsync(int gameid)
    {
        var user = await GetUserInfo() as UserDto ?? throw new NullReferenceException("It is not user type");

        var game = await GetAsync(gameid) as GameDto ?? throw new NullReferenceException("Game was null");

        user.GamesWhichLiked!.Remove(game);

        userWorker.UpdateAsync(NowUserId, user);
    }
    public async Task<object?> GetAsync(int id)
    {
        var user = await userWorker.GetAsync(NowUserId) as UserDto ?? throw new NullReferenceException("Try get game on undefinded user");

        return user.GamesWhichLiked!.Where(x => x.Id == id).FirstOrDefault();
    }
    /// <summary>
    /// This method is alt function for add
    /// </summary>
    /// <param name="userid"></param>
    /// <param name="newdata"></param>
    public async void UpdateAsync(int userid, object obj)
    {
        GameDto newdata = obj as GameDto;

        var user = await GetUserInfo() as UserDto ?? throw new NullReferenceException("It is not user type");

        user.GamesWhichLiked!.Add(newdata);

        userWorker.UpdateAsync(userid, user);
    }
    private async Task<object> GetUserInfo()
    {
        var user = await userWorker.GetAsync(NowUserId) as UserDto ?? throw new NullReferenceException("Try add game on undefinded user");

        if (user.GamesWhichLiked is null)
        {
            user.GamesWhichLiked = new List<GameDto>();

            userWorker.UpdateAsync(NowUserId, user);
        }

        return user;
    }

    Task<IList<object>?> IWorker.GetAllAsync() => throw new NotImplementedException();
}
