using System.Threading.Tasks;
using AutoMapper;
using BuisnessLogic;
using BuisnessLogic.Services;
using CodeGenerator.Data;
using Data.Models.Dto;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;

namespace WebApi.Controllers;
[Route("auth")]
public class AuthController(RefreshTokenService retokenService, JwtManager jwtManager, UnitOfWork unitOfWork) : ControllerBase
{
    [Route("sign-in")]
    [HttpPost]
    public async Task<IActionResult> Login([FromBody] LoginReguestModel model)
    {
        if (string.IsNullOrWhiteSpace(model.Email))
        {
            return Forbid();
        }
        var check = await IsExist(model.Email + "");

        if (!check.Item1)
        {
            return Unauthorized();
        }

        var refreshtoken = retokenService.GenerateRefreshToken(check.Item2!.Id);

        var accesstoken = jwtManager.CreateJwtTokenForUser(check.Item2); 

        return Ok((accesstoken, refreshtoken));
    }
    [Route("unsign-in")]
    [HttpPost]
    public IActionResult Logout() => throw new NotImplementedException();
    [Route("sign-up")]
    [HttpPost]
    public async Task<IActionResult> Register(RegisterRequestModel model)
    {
        if (string.IsNullOrWhiteSpace(model.Email) | 
            string.IsNullOrWhiteSpace(model.Password))
        {
            return Forbid();
        }

        UserDto user = new UserDto();

        var mapper = new Mapper(new MapperConfiguration(cfg => cfg.CreateMap<RegisterRequestModel, UserDto>()
              .ForMember("Email", opt => opt.MapFrom(o => o.Email))
              .ForMember("PasswordHash", opt => opt.MapFrom(src => src.Password))
              .ForMember("NormalizedUserName", opt => opt.MapFrom(src => src.Name))
              ));

        var usermap = mapper.Map<UserDto>(model);

        await unitOfWork.User.AddAsync(user);

        var check = await IsExist(model.Email);
        //check logic of auth
        if (!check.Item1)
        {
            return BadRequest();
        }

        return OkWithTokens(check.Item2!);
       
    }
    private IActionResult OkWithTokens(UserDto user)
    {
        var refreshtoken = retokenService.GenerateRefreshToken(user.Id);

        var accesstoken = jwtManager.CreateJwtTokenForUser(user);

        return Ok();
    }
    private async Task<(bool, UserDto?)> IsExist(string email)
    {

        var users = await unitOfWork.User.GetAllAsync();

        if (users is null)
        {
            return (false, null);
        }
        var user = users.Select(x => (UserDto)x).Where(x => x.Email == email).FirstOrDefault();
        if (user is null)
        {
            return (false, null);
        }

        return (true, user);
        
    }

}
