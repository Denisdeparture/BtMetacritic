using System.Threading.Tasks;
using AutoMapper;
using BuisnessLogic;
using BuisnessLogic.Interfaces;
using BuisnessLogic.Services;
using BuisnessLogic.Services.Security;
using CodeGenerator.Data;
using Data.Models.Dto;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;

namespace WebApi.Controllers;
[Route("auth")]
public class AuthController(RefreshTokenService retokenService,
    IJwtManager jwtManager, 
    UnitOfWork unitOfWork, 
    EncryptionService encryption,
    IMapper mapper) : ControllerBase
{
    [Route("sign-in")]
    [HttpPost]
    public async Task<IActionResult> Login([FromBody] LoginReguestModel model)
    {
        if (string.IsNullOrWhiteSpace(model.Email))
        {
            return Forbid();
        }
        var check = await IsExist(model.Email, model.Password ?? "");

        if (!check.Item1)
        {
            return Unauthorized();
        }

        var refreshtoken = retokenService.GenerateRefreshTokenAsync(check.Item2!.Id);

        var accesstoken = jwtManager.CreateJwtTokenForUser(check.Item2); 

        return Ok((accesstoken, refreshtoken));
    }
    [Route("unsign-in")]
    [HttpDelete]
    public IActionResult Logout([FromBody]string token)
    {
        retokenService.RevokeRefreshTokenAsync(token);

        return Ok();

    }
    [Route("sign-up")]
    [HttpPost]
    public async Task<IActionResult> Register([FromBody]RegisterRequestModel model)
    {
        if (string.IsNullOrWhiteSpace(model.Email) | 
            string.IsNullOrWhiteSpace(model.Password))
        {
            return Forbid();
        }

        var usermap = mapper.Map<UserDto>(model);

        var schipherText = encryption.SaltAndHash(model.Password!, 64);

        usermap.PasswordHash = schipherText.hash;

        usermap.SaltForPassword = schipherText.salt;

        if (await unitOfWork.User.AddAsync(usermap) is not UserDto user)
        {
            return BadRequest();
        }

        return OkWithTokens(user);
       
    }
    private IActionResult OkWithTokens(UserDto user)
    {
        var refreshtoken = retokenService.GenerateRefreshTokenAsync(user.Id);

        var accesstoken = JwtCreator.CreateAccessToken(user, jwtManager);

        return Ok((refreshtoken, accesstoken));
    }
    private async Task<(bool, UserDto?)> IsExist(string email, string password)
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

        var passwordVerify = encryption.VerifyPassword(password, user.PasswordHash!, user.SaltForPassword);

        if (!passwordVerify)
        {
            return (false, null);
        }

        return (true, user);
        
    }

}
