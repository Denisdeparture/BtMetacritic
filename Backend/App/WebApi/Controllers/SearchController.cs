using System.Security.Claims;
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
            var firstes = favoriteService.GetFavoritesFromUser(count);

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
    public async Task<IActionResult> GetLiked() => await GetFromUserWith(x => x.GamesWhichLiked, User.FindFirst(ClaimTypes.Email)!.Value);
    [Authorize]
    [HttpPost]
    [Route("liked")]
    public async Task<IActionResult> AddLiked([FromBody] GameItemModel info) => await AddFromUserWith(User.FindFirst(ClaimTypes.Email)!.Value, info, KindOfGames.Liked);
    [HttpDelete]
    [Authorize]

    [Route("liked")]
    public async Task<IActionResult> DeleteLiked([FromQuery] GameItemModel info) => await DeleteFromUserWith(User.FindFirst(ClaimTypes.Email)!.Value, info, KindOfGames.Liked);
    [HttpGet]
    [Authorize]

    [Route("viewed")]
    public async Task<IActionResult> GetViewed() => await GetFromUserWith(x => x.GamesWhichViewed, User.FindFirst(ClaimTypes.Email)!.Value);
    [HttpPost]
    [Authorize]

    [Route("viewed")]
    public async Task<IActionResult> AddViewed([FromBody] GameItemModel info) => await AddFromUserWith(User.FindFirst(ClaimTypes.Email)!.Value, info, KindOfGames.Liked);
    [HttpDelete]
    [Authorize]

    [Route("viewed")]
    public async Task<IActionResult> DeleteViewed([FromQuery] GameItemModel info) => await DeleteFromUserWith(User.FindFirst(ClaimTypes.Email)!.Value, info, KindOfGames.Viewed);

    [NonAction]
    private async Task<IActionResult> GetFromUserWith(Func<UserDto, IList<GameDto>?> func, string email)
    {
        try
        {
            logger.LogDebug("Try get Game info with user {User}", email);

            var obj = await worker.User.GetAsync<UserDto,string>(x => x.Email!, email);


            if (obj is not UserDto user)
            {
                return NotFound();
            }

            var games = func(user);

            if (games is null)
            {
                return NotFound();
            }

            var gamesInfo = await steamApi.GetInfoAboutGames(games!.ToList());

            return Ok(gamesInfo);
        }
        catch (Exception ex)
        {
            logger.LogError(ex.Message + Environment.NewLine + ex.StackTrace + Environment.NewLine + ex.Source);


            return StatusCode(500);
        }
    }
    [NonAction]
    private async Task<IActionResult> AddFromUserWith(string email, GameItemModel info, KindOfGames kindOfGames)
    {
        try
        {
            logger.LogDebug("Try Add Game info with user {User} on {Kind} array games", email, kindOfGames);


            var obj = await worker.User.GetAsync<UserDto,string>(x => x.Email, email);

            if (obj is not UserDto user)
            {
                logger.LogDebug("User {User} was null, while try get games ", email);

                return NotFound();
            }
            var dto = mapper.Map<GameDto>(info);

            var task = repository.AddUserToGame(user, dto, kindOfGames);

            task.Wait();

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

    private async Task<IActionResult> DeleteFromUserWith(string email, GameItemModel info, KindOfGames kind)
    {
        try
        {

            logger.LogDebug("Try Delete Game {Game} info with user {User} on {Kind} array games", info.id, email, kind);


            var obj = await worker.User.GetAsync<UserDto, string>(x => x.Email, email);

            if (obj is not UserDto user)
            {
                logger.LogDebug("User {User} was null, while try get games ", email);

                return NotFound();
            }
            var dto = mapper.Map<GameDto>(info);

            await repository.DeleteUserToGame(user, dto, kind);

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

