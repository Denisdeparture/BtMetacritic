using System.Threading.Tasks;
using AutoMapper;
using BuisnessLogic;
using BuisnessLogic.Interfaces;
using BuisnessLogic.Models;
using BuisnessLogic.Models.SteamApi;
using BuisnessLogic.Models.SteamApi.Group;
using BuisnessLogic.Services;
using Data.Models.Dto;
using Microsoft.AspNetCore.Mvc;
using WebApi.Extensions;

namespace WebApi.Controllers;
[ApiController]
[Route("game")]
public class SearchController(
    ISteamApi steamApi, 
    UnitOfWork worker, 
    IFavoriteService favoriteService, 
    TrigramSearchService searchService,
    IMapper mapper, ILogger logger) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetGame([FromQuery] int id)
    {
        try
        {
            var game = await steamApi.GetGameByIdAsync(id.ToString());

            return Ok(game);
        }
        catch (Exception ex)
        {
            logger.LogError(ex.Message + Environment.NewLine + ex.StackTrace);

            return StatusCode(500);
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetGame([FromQuery] string name)
    {
        try
        {
            var results = await searchService.GetSimilarResult(name);

            return Ok(results);
        }
        catch (Exception ex)
        {
            logger.LogError(ex.Message + Environment.NewLine + ex.StackTrace);

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

            return Ok(firstes);
        }
        catch (Exception ex)
        {
            logger.LogError(ex.Message + Environment.NewLine + ex.StackTrace);

            return StatusCode(500);
        }
    }

    [HttpGet]
    [Route("liked")]
    public async Task<IActionResult> GetLiked([FromQuery] int userId) => await GetFromUserWith(x => x.GamesWhichLiked, userId);
    [HttpPost]
    [Route("liked")]
    public async Task<IActionResult> AddLiked([FromQuery] int userId, [FromBody] GameInfoModel info) => await AddFromUserWith(x => x.GamesWhichLiked, userId, info, KindOfGames.Liked);
    [HttpDelete]
    [Route("liked")]
    public async Task<IActionResult> DeleteLiked([FromQuery] int userId, int gameId) => await DeleteFromUserWith(x => x.GamesWhichLiked, userId, gameId, KindOfGames.Liked);
    [HttpGet]
    [Route("viewed")]
    public async Task<IActionResult> GetViewed([FromQuery] int userId) => await GetFromUserWith(x => x.GamesWhichViewed, userId);
    [HttpPost]
    [Route("viewed")]
    public async Task<IActionResult> AddViewed([FromQuery] int userId, [FromBody] GameInfoModel info) => await AddFromUserWith(x => x.GamesWhichViewed, userId, info, KindOfGames.Liked);
    [HttpDelete]
    [Route("viewed")]
    public async Task<IActionResult> DeleteViewed([FromQuery] int userId, int gameId) => await DeleteFromUserWith(x => x.GamesWhichViewed, userId, gameId, KindOfGames.Viewed);

    private async Task<IActionResult> GetFromUserWith(Func<UserDto, IList<GameDto>?> func, int userId)
    {
        try
        {
            logger.LogDebug("Try get Game info with user {User}", userId);

            var obj = await worker.User.GetAsync<int>("Id", userId);


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
            logger.LogError(ex.Message + Environment.NewLine + ex.StackTrace);

            return StatusCode(500);
        }
    }
    private async Task<IActionResult> AddFromUserWith(Func<UserDto, IList<GameDto>?> func, int userId, GameInfoModel info, KindOfGames kindOfGames)
    {
        try
        {
            logger.LogDebug("Try Add Game info with user {User} on {Kind} array games", userId, kindOfGames);


            var obj = await worker.User.GetAsync<int>("Id", userId);

            if (obj is not UserDto user)
            {
                logger.LogDebug("User {User} was null, while try get games ", userId);

                return NotFound();
            }

            var games = func(user);

            games ??= new List<GameDto>();

            var dto = mapper.Map<GameDto>(info);

            games.Add(dto);

            if (kindOfGames == KindOfGames.Liked)
            {


                user.GamesWhichLiked = games.ToList();
            }
            else
            {
                user.GamesWhichViewed = games.ToList();
            }

            worker.User.UpdateAsync(userId, user);

            logger.LogInformation("Sucesss uadd");


            return Ok();
        }
        catch(Exception ex)
        {
            logger.LogError(ex.Message + Environment.NewLine + ex.StackTrace);

            return StatusCode(500);
        }
    }
    private async Task<IActionResult> DeleteFromUserWith(Func<UserDto, IList<GameDto>?> func, int userId, int gameId, KindOfGames kind)
    {
        try
        {

            logger.LogDebug("Try Delete Game {Game} info with user {User} on {Kind} array games", gameId, userId, kind);


            var obj = await worker.User.GetAsync<int>("Id", userId);

            if (obj is not UserDto user)
            {
                logger.LogDebug("User {User} was null, while try get games ", userId);

                return NotFound();
            }

            var games = func(user);

            if (games is null)
            {
                logger.LogDebug("Why games were null?!");


                return BadRequest();
            }


            var game = games.Where(x => x.Id == gameId).FirstOrDefault();

            if (game is null)
            {
                logger.LogDebug("Not found game with gameId {GI}", gameId);

                return NotFound();
            }

            if (kind == KindOfGames.Liked)
            {
                if (user.GamesWhichLiked is null)
                {
                    logger.LogDebug("User games {kind} array was null", kind);

                    return BadRequest();
                }
                user.GamesWhichLiked.RemoveAll(x => x.Id == gameId);
            }
            else
            {
                if (user.GamesWhichViewed is null)
                {
                    logger.LogDebug("User games {kind} array was null", kind);

                    return BadRequest();
                }
                user.GamesWhichViewed.RemoveAll(x => x.Id == gameId);
            }

            worker.User.UpdateAsync(userId, user);

            logger.LogInformation("Success delete");

            return Ok();
        }
        catch (Exception ex)
        {
            logger.LogError(ex.Message + Environment.NewLine + ex.StackTrace);

            return StatusCode(500);
        }

    }

}
public enum KindOfGames 
{
    Viewed,
    Liked
}
