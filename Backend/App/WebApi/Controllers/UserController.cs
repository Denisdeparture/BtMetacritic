using System.Threading.Tasks;
using AutoMapper;
using BuisnessLogic;
using CodeGenerator.Data;
using Data.Models.Dto;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;

namespace WebApi.Controllers;
[Route("about/user")]
[ApiController]
public class UserController(UnitOfWork unitOfWork, IMapper mapper) : ControllerBase
{
    [HttpGet("all")]
    public async Task<IActionResult> GetAll()
    {
        var users = await unitOfWork.User.GetAllAsync();

        return Ok(users);
    }

    [HttpGet]
    public async Task<IActionResult> GetInfo([FromRoute] int id)
    {
        var user = await unitOfWork.User.GetAsync("Id",id);

        return Ok(user);
    }
    [HttpPatch]
    public async Task<IActionResult> UpdateUser([FromQuery] int id , [FromBody] UserModel newData)
    {
   

        var usermap = mapper.Map<UserDto>(newData);

        var oldUser = await unitOfWork.User.GetAsync("Id",id);

        if(oldUser is null)
        {
            return Unauthorized();
        }

        unitOfWork.User.UpdateAsync(id,usermap);

        return Ok(usermap);

    }
    [HttpPatch]
    public async Task<IActionResult> UpdateUser([FromQuery] string email, [FromBody] UserModel newData)
    {
        var usermap = mapper.Map<UserDto>(newData);

        var obj = await unitOfWork.User.GetAsync("Email", email);

        if (obj is not UserDto oldUser)
        {
            return Unauthorized();
        }

        unitOfWork.User.UpdateAsync(oldUser.Id, usermap);

        return Ok(usermap);

    }
    [HttpDelete]
    public async Task<IActionResult> DeleteUser([FromQuery] int id)
    {
        var oldUser = await unitOfWork.User.GetAsync("Id", id);

        if (oldUser is null)
        {
            return Unauthorized();
        }

        await unitOfWork.User.DeleteAsync(id);

        return Ok();
    }

}
