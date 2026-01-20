using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using BuisnessLogic;
using BuisnessLogic.Models;
using CodeGenerator.Data;
using Data.Models.Dto;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;

namespace WebApi.Controllers;
[Route("about/user")]
[ApiController]
public class UserController(UnitOfWork unitOfWork, IMapper mapper, ILogger logger) : ControllerBase
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
            logger.LogError(ex.Message + Environment.NewLine + ex.StackTrace);

            return StatusCode(500);
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetInfo([FromQuery] string token)
    {
        try
        {
            logger.LogDebug("Try get info with token {Token}", token);

            var claim = User.FindFirst(ClaimTypes.Email);

            if(claim is null)
            {
                return NotFound();
            }

            var obj = await unitOfWork.User.GetAsync<string>("Email", claim.Value);

            var user = obj as UserDto;

            var map = mapper.Map<UserModel>(user);

            return Ok(map);
        }
        catch(Exception ex)
        {
            logger.LogError(ex.Message + Environment.NewLine + ex.StackTrace);

            return StatusCode(500);
        }
    }
    [HttpPatch]
    public async Task<IActionResult> UpdateUser([FromQuery] int id , [FromBody] UserModel newData)
    {
        try
        {
            logger.LogDebug("Try update user with {Id} and new data {Data}", id, string.Join(Environment.NewLine,
                newData.GetType().GetProperties().Select(x => x.Name + ":" + (x.GetValue(newData) ?? "").ToString())));

            var usermap = mapper.Map<UserDto>(newData);

            var oldUser = await unitOfWork.User.GetAsync("Id", id);

            if (oldUser is null)
            {
                logger.LogDebug("Old user with id {Id} wasn t found ", id);

                return Unauthorized();
            }

            unitOfWork.User.UpdateAsync(id, usermap);

            logger.LogInformation("Success update");

            return Ok(usermap);
        }
        catch (Exception ex)
        {
            logger.LogError(ex.Message + Environment.NewLine + ex.StackTrace);

            return StatusCode(500);
        }

    }
    [HttpPatch]
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

            unitOfWork.User.UpdateAsync(oldUser.Id, usermap);
            logger.LogInformation("Success update");

            return Ok(usermap);
        }
        catch(Exception ex)
        {
            logger.LogError(ex.Message + Environment.NewLine + ex.StackTrace);

            return StatusCode(500);
        }

    }
    [HttpDelete]
    public async Task<IActionResult> DeleteUser([FromQuery] int id)
    {
        try
        {
            var oldUser = await unitOfWork.User.GetAsync("Id", id);

            if (oldUser is null)
            {
                logger.LogDebug("Old user with id {Id} wasn t found ", id);

                return Unauthorized();
            }

            await unitOfWork.User.DeleteAsync(id);

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
