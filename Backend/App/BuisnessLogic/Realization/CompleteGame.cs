using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CodeGenerator.Data;
using Data;
using Data.Dto;
using Microsoft.EntityFrameworkCore;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace UnitOfWorkUpgrade.Realization;

// it is not singleton service
public class CompleteGame(IWorker<UserDto> worker) : IWorker<GameDto>
{
    private int NowUserId { get; set; }
    public void SetUserId(int id) => NowUserId = id;
    public async Task AddAsync(GameDto data)
    {
        var user = await GetUserInfo();

        user.GamesWhichLiked!.Add(data);

        worker.UpdateAsync(NowUserId, user);
    }
    public async Task DeleteAsync(int gameid)
    {
        var user = await GetUserInfo();

        var game = await GetAsync(gameid) ?? throw new NullReferenceException("Game was null");

        user.GamesWhichLiked!.Remove(game);

        worker.UpdateAsync(NowUserId, user);
    }
    public async Task<IList<GameDto>?> GetAllAsync()
    {
        var user = await worker.GetAsync(NowUserId) ?? throw new NullReferenceException("Try delete game on undefinded user");

        return user.GamesWhichLiked;
    }
    public async Task<GameDto?> GetAsync(int id)
    {
        var user = await worker.GetAsync(NowUserId) ?? throw new NullReferenceException("Try get game on undefinded user");

        return user.GamesWhichLiked!.Where(x => x.Id == id).FirstOrDefault();
    }
    /// <summary>
    /// This method is alt function for add
    /// </summary>
    /// <param name="userid"></param>
    /// <param name="newdata"></param>
    public async void UpdateAsync(int userid, GameDto newdata)
    {
        var user = await GetUserInfo();

        user.GamesWhichLiked!.Add(newdata);

        worker.UpdateAsync(userid, user);
    }
    private async Task<UserDto> GetUserInfo()
    {
        var user = await worker.GetAsync(NowUserId) ?? throw new NullReferenceException("Try add game on undefinded user");

        if (user.GamesWhichLiked is null)
        {
            user.GamesWhichLiked = new List<GameDto>();

            worker.UpdateAsync(NowUserId, user);
        }

        return user;
    }
}
