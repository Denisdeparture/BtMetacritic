using System.Threading.Tasks;
using AutoMapper;
using BuisnessLogic;
using BuisnessLogic.Interfaces;
using BuisnessLogic.Models;
using BuisnessLogic.Models.SteamApi;
using BuisnessLogic.Models.SteamApi.Group;
using BuisnessLogic.Realization;
using BuisnessLogic.Services;
using Data.Interfaces;
using Data.Models.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WebApi.Extensions;

namespace WebApi.Controllers;
[ApiController]
[Route("game")]
public class SearchController(
    ISteamApi steamApi, 
    UnitOfWork worker, 
    IFavoriteService favoriteService, 
    TrigramSearchService searchService,
    IGameRepository repository,
    IMapper mapper, ILogger<SearchController> logger) : ControllerBase
{
    [HttpGet]
    [Route("infoById")]
    public async Task<IActionResult> GetGame([FromQuery] int id)
    {
        try
        {
            logger.LogDebug("Process getting game");

            var game = await steamApi.GetGameByIdAsync(id.ToString());

            return Ok(game);
        }
        catch (Exception ex)
        {
            logger.LogError(ex.Message + Environment.NewLine + ex.StackTrace + Environment.NewLine + ex.Source);


            return StatusCode(500);
        }
    }
    [HttpGet]
    [Route("infoByIds")]
    public async Task<IActionResult> GetGame([FromQuery] int[] ids)
    {
        try
        {
            logger.LogDebug("Process getting games");

            var games = new List<GameInfoModel>();
            

            foreach (int id in ids)
            {

                var game =  await steamApi.GetGameByIdAsync(id.ToString());

                if(game is null)
                {
                    logger.LogTrace("Game with id {Id} was null", id);

                    continue;
                }

                games.Add(game);
            }

            return Ok(games);
        }
        catch (Exception ex)
        {
            logger.LogError(ex.Message + Environment.NewLine + ex.StackTrace + Environment.NewLine + ex.Source);


            return StatusCode(500);
        }
    }

    [HttpGet]
    [Route("infoByName")]
    public async Task<IActionResult> GetGame([FromQuery] string name)
    {
        try
        {
            logger.LogDebug("Process getting game");

            var results = await searchService.GetSimilarResult(name);

            if(results is null || results.Count == 0)
            {
                return NotFound();
            }

            return Ok(results.ToArray());
        }
        catch (Exception ex)
        {
            logger.LogError(ex.Message + Environment.NewLine + ex.StackTrace + Environment.NewLine + ex.Source);

            return StatusCode(500);
        }
    }
    [HttpGet]
    [Route("takefirst")]
    public async Task<IActionResult> TakeFirst([FromQuery] int count)
    {
        try
        {
            var firstes = await favoriteService.GetFavoritesFromUser(count);

            if (firstes is null)
            {
                logger.LogDebug("Not found favorites");
            }

            var games = await steamApi.GetInfoAboutGames(firstes.ToList());

            return Ok(games.ToArray());
        }
        catch (Exception ex)
        {
            logger.LogError(ex.Message + Environment.NewLine + ex.StackTrace + Environment.NewLine + ex.Source);

            return StatusCode(500);
        }
    }

    [HttpGet]
    [Authorize]
    [Route("liked")]
    public async Task<IActionResult> GetLiked([FromQuery] int userId) => await GetFromUserWith(x => x.GamesWhichLiked, userId);
    [Authorize]
    [HttpPost]
    [Route("liked")]
    public async Task<IActionResult> AddLiked([FromQuery] int userId, [FromBody] GameItemModel info) => await AddFromUserWith( userId, info, KindOfGames.Liked);
    [HttpDelete]
    [Authorize]

    [Route("liked")]
    public async Task<IActionResult> DeleteLiked([FromQuery] int userId, int gameId) => await DeleteFromUserWith( userId, gameId, KindOfGames.Liked);
    [HttpGet]
    [Authorize]

    [Route("viewed")]
    public async Task<IActionResult> GetViewed([FromQuery] int userId) => await GetFromUserWith(x => x.GamesWhichViewed, userId);
    [HttpPost]
    [Authorize]

    [Route("viewed")]
    public async Task<IActionResult> AddViewed([FromQuery] int userId, [FromBody] GameItemModel info) => await AddFromUserWith( userId, info, KindOfGames.Liked);
    [HttpDelete]
    [Authorize]

    [Route("viewed")]
    public async Task<IActionResult> DeleteViewed([FromQuery] int userId, int gameId) => await DeleteFromUserWith( userId, gameId, KindOfGames.Viewed);

    [NonAction]
    private async Task<IActionResult> GetFromUserWith(Func<UserDto, IList<GameDto>?> func, int userId)
    {
        try
        {
            logger.LogDebug("Try get Game info with user {User}", userId);

            var obj = await worker.User.GetAsync<UserDto,int>(x => x.Id, userId);


            if (obj is not UserDto user)
            {
                return NotFound();
            }

            var games = func(user);

            if (games is null)
            {
                return NotFound();
            }

            var gamesInfo = steamApi.GetInfoAboutGames(games!.ToList());

            return Ok(gamesInfo);
        }
        catch (Exception ex)
        {
            logger.LogError(ex.Message + Environment.NewLine + ex.StackTrace + Environment.NewLine + ex.Source);


            return StatusCode(500);
        }
    }
    [NonAction]
    private async Task<IActionResult> AddFromUserWith(int userId, GameItemModel info, KindOfGames kindOfGames)
    {
        try
        {
            logger.LogDebug("Try Add Game info with user {User} on {Kind} array games", userId, kindOfGames);


            var obj = await worker.User.GetAsync<UserDto,int>(x => x.Id, userId);

            if (obj is not UserDto user)
            {
                logger.LogDebug("User {User} was null, while try get games ", userId);

                return NotFound();
            }
            var dto = mapper.Map<GameDto>(info);

            if (kindOfGames == KindOfGames.Liked)
            {
                user.GamesWhichLiked!.Add(dto);
            }

            if (kindOfGames == KindOfGames.Viewed)
            {
                user.GamesWhichViewed!.Add(dto);;
            }
            var task = repository.AddUserToGame(user, info.id, kindOfGames);

            task.Wait();

            worker.User.UpdateAsync(userId, user);

            logger.LogInformation("Sucesss user add");


            return Ok();
        }
        catch(Exception ex)
        {
            logger.LogError(ex.Message + Environment.NewLine + ex.StackTrace + Environment.NewLine + ex.Source);


            return StatusCode(500);
        }
    }
    [NonAction]

    private async Task<IActionResult> DeleteFromUserWith(int userId, int gameId, KindOfGames kind)
    {
        try
        {

            logger.LogDebug("Try Delete Game {Game} info with user {User} on {Kind} array games", gameId, userId, kind);


            var obj = await worker.User.GetAsync<UserDto, int>(x => x.Id, userId);

            if (obj is not UserDto user)
            {
                logger.LogDebug("User {User} was null, while try get games ", userId);

                return NotFound();
            }
       
            if (kind == KindOfGames.Liked)
            {
                user.GamesWhichLiked!.RemoveAll(x => x.Id == gameId);
            }
            else
            {
                user.GamesWhichViewed!.RemoveAll(x => x.Id == gameId);
            }

            await repository.DeleteUserToGame(user, gameId, kind);


            worker.User.UpdateAsync(userId, user);

            logger.LogInformation("Success delete");

            return Ok();
        }
        catch (Exception ex)
        {
            logger.LogError(ex.Message + Environment.NewLine + ex.StackTrace + Environment.NewLine + ex.Source);


            return StatusCode(500);
        }

    }

}

