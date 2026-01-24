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
    [Authorize]
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
                id = user.Id,

                info = info,
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
    public async Task<IActionResult> UpdateUser([FromBody] UserModel newData)
    {
        try
        {
            var email = User.FindFirst(ClaimTypes.Email).Value;

            logger.LogDebug("Try update user with {Id} and new data {Data}", email, string.Join(Environment.NewLine,
                newData.GetType().GetProperties().Select(x => x.Name + ":" + (x.GetValue(newData) ?? "").ToString())));

            var usermap = mapper.Map<UserDto>(newData);

#pragma warning disable IDE0019 // Используйте сопоставление шаблонов
            var oldUser = await unitOfWork.User.GetAsync<UserDto, string>(x => x.Email, email) as UserDto;
#pragma warning restore IDE0019 // Используйте сопоставление шаблонов


            if (oldUser is null)
            {
                logger.LogDebug("Old user with id {Id} wasn t found ", email);

                return Unauthorized();
            }

            usermap.Id = oldUser.Id;

            unitOfWork.User.UpdateAsync(oldUser.Id, usermap);

            logger.LogInformation("Success update");

            var info = mapper.Map<SimpleUserInfo>(usermap);

            var map = new UserModel()
            {
                id = oldUser.Id,

                info = info,
            };

            return Ok(map);

        }
        catch (Exception ex)
        {
            logger.LogError(ex.Message + Environment.NewLine + ex.StackTrace + Environment.NewLine + ex.Source);


            return StatusCode(500);
        }

    }
    [HttpDelete]
    [Authorize]
    [Route("user")]
    public async Task<IActionResult> DeleteUser()
    {
        try
        {
            var email = User.FindFirst(ClaimTypes.Email).Value;

#pragma warning disable IDE0019 // Используйте сопоставление шаблонов
            var oldUser = await unitOfWork.User.GetAsync<UserDto, string>(x => x.Email, email) as UserDto;
#pragma warning restore IDE0019 // Используйте сопоставление шаблонов

            if (oldUser is null)
            {
                logger.LogDebug("Old user with id {Id} wasn t found ", email);

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
