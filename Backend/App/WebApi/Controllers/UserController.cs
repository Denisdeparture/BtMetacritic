using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using BuisnessLogic;
using BuisnessLogic.Models;
using CodeGenerator.Data;
using Data.Models.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;

namespace WebApi.Controllers;
[Route("about")]
[ApiController]
public class UserController(UnitOfWork unitOfWork, IMapper mapper, ILogger<UserController> logger) : ControllerBase
{
    [HttpGet("all")]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            logger.LogDebug("Try get all");

            var users = await unitOfWork.User.GetAllAsync();

            return Ok(users);
        }
        catch(Exception ex)
        {
            logger.LogError(ex.Message + Environment.NewLine + ex.StackTrace + Environment.NewLine + ex.Source);


            return StatusCode(500);
        }
    }

    [HttpGet]
    [Route("user")]
    public async Task<IActionResult> GetInfo()
    {
        try
        {
            logger.LogDebug("Try get info with token");

            var claim = User.FindFirst(ClaimTypes.Email);

            if(claim is null)
            {
                return NotFound();
            }

            var obj = await unitOfWork.User.GetAsync<UserDto, string?>(x => x.Email, claim.Value);

            var user = (UserDto)obj ?? throw new NullReferenceException("User was null");

            var info = mapper.Map<SimpleUserInfo>(user);

            var map = new UserModel()
            {
                Id = user.Id,

                Info = info,
            };

            return Ok(map);
        }
        catch(Exception ex)
        {
            logger.LogError(ex.Message + Environment.NewLine + ex.StackTrace + Environment.NewLine + ex.Source);


            return StatusCode(500);
        }
    }
    [HttpPatch]
    [Authorize]
    [Route("user")]
    public async Task<IActionResult> UpdateUser([FromQuery] int id , [FromBody] UserModel newData)
    {
        try
        {
            logger.LogDebug("Try update user with {Id} and new data {Data}", id, string.Join(Environment.NewLine,
                newData.GetType().GetProperties().Select(x => x.Name + ":" + (x.GetValue(newData) ?? "").ToString())));

            var usermap = mapper.Map<UserDto>(newData);

#pragma warning disable IDE0019 // Используйте сопоставление шаблонов
            var oldUser = await unitOfWork.User.GetAsync<UserDto, int>(x => x.Id, id) as UserDto;
#pragma warning restore IDE0019 // Используйте сопоставление шаблонов


            if (oldUser is null)
            {
                logger.LogDebug("Old user with id {Id} wasn t found ", id);

                return Unauthorized();
            }

            usermap.Id = oldUser.Id;

            unitOfWork.User.UpdateAsync(id, usermap);

            logger.LogInformation("Success update");

            var info = mapper.Map<SimpleUserInfo>(newData);

            var map = new UserModel()
            {
                Id = oldUser.Id,

                Info = info,
            };

            return Ok(map);

        }
        catch (Exception ex)
        {
            logger.LogError(ex.Message + Environment.NewLine + ex.StackTrace + Environment.NewLine + ex.Source);


            return StatusCode(500);
        }

    }
    [HttpPatch]
    [Authorize]
    [Route("user/v2")]
    public async Task<IActionResult> UpdateUser([FromQuery] string email, [FromBody] UserModel newData)
    {
        try
        {
            logger.LogDebug("Try update user with {Email} and new data {Data}", email,
                string.Join(Environment.NewLine, newData.GetType().GetProperties().Select(x => x.Name + ":" + (x.GetValue(newData) ?? "").ToString())));

            var usermap = mapper.Map<UserDto>(newData);

            var obj = await unitOfWork.User.GetAsync("Email", email);



            if (obj is not UserDto oldUser)
            {
                logger.LogDebug("Old user with email {Email} wasn t found ", email);

                return Unauthorized();
            }

            usermap.Id = oldUser.Id;


            unitOfWork.User.UpdateAsync(oldUser.Id, usermap);

            logger.LogInformation("Success update");

            var info = mapper.Map<SimpleUserInfo>(newData);

            var map = new UserModel()
            {
                Id = oldUser.Id,

                Info = info,
            };

            return Ok(map);
        }
        catch(Exception ex)
        {
            logger.LogError(ex.Message + Environment.NewLine + ex.StackTrace + Environment.NewLine + ex.Source);


            return StatusCode(500);
        }

    }
    [HttpDelete]
    [Authorize]
    [Route("user")]
    public async Task<IActionResult> DeleteUser([FromQuery] int id)
    {
        try
        {
#pragma warning disable IDE0019 // Используйте сопоставление шаблонов
            var oldUser = await unitOfWork.User.GetAsync<UserDto, int>(x => x.Id, id) as UserDto;
#pragma warning restore IDE0019 // Используйте сопоставление шаблонов

            if (oldUser is null)
            {
                logger.LogDebug("Old user with id {Id} wasn t found ", id);

                return Unauthorized();
            }

            await unitOfWork.User.DeleteAsync(oldUser.Id);

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
