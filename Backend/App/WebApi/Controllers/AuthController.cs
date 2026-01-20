using System.Threading.Tasks;
using AspNet.Security.OAuth.Yandex;
using AutoMapper;
using BuisnessLogic;
using BuisnessLogic.Interfaces;
using BuisnessLogic.Interfaces.Security;
using BuisnessLogic.Models;
using BuisnessLogic.Services;
using BuisnessLogic.Services.Security;
using CodeGenerator.Data;
using Data.Models.Dto;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;

namespace WebApi.Controllers;
[Route("auth")]
public class AuthController(IRefresher retokenService,
    IJwtManager jwtManager, 
    UnitOfWork unitOfWork, 
    EncryptionService encryption,
    IMapper mapper,
    ILogger logger) : ControllerBase
{
    [Route("sign-in")]
    [HttpPost]
    public async Task<IActionResult> Login([FromBody] LoginReguestModel model)
    {
        try
        {
            logger.LogDebug("Requested login for user {Email} with password {Password}", model.Email, model.Password);
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

            logger.LogDebug("After end operation we get accsess token {Token} and refresh token {Token2}", accesstoken, refreshtoken);
            return Ok((accesstoken, refreshtoken));
        }
        catch (Exception ex)
        {
            logger.LogError(ex.Message + Environment.NewLine + ex.StackTrace);

            return StatusCode(500);
        }
    }
    [Route("unsign-in")]
    [HttpDelete]
    public IActionResult Logout([FromBody]string token)
    {
        try
        {
            logger.LogDebug("Use {Token2} try logout", token);

            retokenService.RevokeRefreshTokenAsync(token);

            return Ok();
        }
        catch (Exception ex)
        {
            logger.LogError(ex.Message + Environment.NewLine + ex.StackTrace);

            return StatusCode(500);
        }

    }
    [Route("sign-up")]
    [HttpPost]
    public async Task<IActionResult> Register([FromBody]RegisterRequestModel model)
    {
        try
        {
            logger.LogDebug("Requested registation for user {Email} with password {Password} and name {Name}", model.Email, model.Password, model.Name);

            if (string.IsNullOrWhiteSpace(model.Email) |
                string.IsNullOrWhiteSpace(model.Password))
            {
                logger.LogDebug("Request was cancelled with email {Email} and {Password}", model.Email, model.Password);
                return Forbid();
            }

            var usermap = mapper.Map<UserDto>(model);

            var isExist = await IsExist(model.Email, model.Password);

            if (isExist.Item1)
            {
                logger.LogDebug("Requested registation for user {Email} with password {Password} and name {Name} was cancelled becuse user already exist", model.Email, model.Password, model.Name);
                return BadRequest();
            }
            var schipherText = encryption.SaltAndHash(model.Password!, 64);

            usermap.PasswordHash = schipherText.hash;

            usermap.SaltForPassword = schipherText.salt;

            logger.LogDebug("Encrypt we get {Hash} and {Salt}", schipherText.hash, schipherText.salt);


            if (await unitOfWork.User.AddAsync(usermap) is not UserDto user)
            {
                logger.LogDebug("Add user operation was cancelled with email {Email} and {Password}", model.Email, model.Password);
                return BadRequest();
            }

            return OkWithTokens(user);
        }
        catch (Exception ex)
        {
            logger.LogError(ex.Message + Environment.NewLine + ex.StackTrace);

            return StatusCode(500);
        }
       
    }

    [Route("oauth")]
    [HttpGet]
    public IActionResult ProviderAuthentication([FromQuery] string provider)
    {
        try
        {

            logger.LogDebug("Try provided on {Provider}", provider);

            const string actionForRedirect = nameof(OAuthCallback);

            var actionUrlFormRedirect = Url.Action(actionForRedirect, "", "");

            var properties = new AuthenticationProperties
            {
                RedirectUri = actionUrlFormRedirect
            };

            return Challenge(properties, provider);
        }
        catch(Exception ex)
        {
            logger.LogError(ex.Message + Environment.NewLine + ex.StackTrace);

            return StatusCode(500);
        }
    }

    [Route("oauth")]
    [HttpPost]
    public async Task<IActionResult> OAuthLogin([FromBody] ProviderModel model)
    {
        try
        {

            //there must be a validation of the token, followed by its extraction

            logger.LogDebug("Provided model was recived on {Provider} with email {Email} and Jwt Token id {Jwt}", model.Provider, model.Email, model.JwtId);

            var user = await retokenService.FindOrCreateUserByProviderId(model);

            return OkWithTokens(user);
        }
        catch(Exception ex)
        {
            logger.LogError(ex.Message + Environment.NewLine + ex.StackTrace);

            return StatusCode(500);
        }
    }
    [HttpGet("oauth-response")]
    public async Task<IActionResult> OAuthCallback()
    {
        try
        {
            logger.LogDebug("Try authentiticate model");

            var result = await HttpContext.AuthenticateAsync();

            if (!result.Succeeded)
            {
                logger.LogDebug("Auth wasn`t success {error}", result.Failure!.Message);


                return Unauthorized();

            }
            var claims = result.Principal.Claims.Select(c => new
            {
                c.Type,
                c.Value
            });

            logger.LogDebug("End auth model with claims {Claims}", string.Join(Environment.NewLine, claims.Select(x => x.Value)));

            return Ok(claims);
        }
        catch (Exception ex)
        {
            logger.LogError(ex.Message + Environment.NewLine + ex.StackTrace);

            return StatusCode(500);
        }
    }
    private IActionResult OkWithTokens(UserDto user)
    {
        try
        {
            logger.LogDebug("Creating tokens for user {Name} with email {Email}", user.FirstName, user.Email);

            var refreshtoken = retokenService.GenerateRefreshTokenAsync(user.Id);

            var accesstoken = JwtCreator.CreateAccessToken(user, jwtManager);

            logger.LogDebug("Creating tokens was success");

            return Ok((refreshtoken, accesstoken));
        }
        catch (Exception ex)
        {
            logger.LogError(ex.Message + Environment.NewLine + ex.StackTrace);

            return StatusCode(500);
        }
    }
    

    private async Task<(bool, UserDto?)> IsExist(string email, string password)
    {
        logger.LogDebug("Check existing user with email {Email}", email);

        var users = await unitOfWork.User.GetAllAsync();

        var user = users.Select(x => (UserDto)x).Where(x => x.Email == email).FirstOrDefault();

        if (user is null)
        {
            logger.LogDebug("Check existing user with email {Email} show that user doesn`t exist", email);

            return (false, null);
        }

        var passwordVerify = encryption.VerifyPassword(password, user.PasswordHash!, user.SaltForPassword);

        if (!passwordVerify)
        {
            logger.LogDebug("Password verify wasn`t success, hash not right {Hash1}", user.PasswordHash);

            return (false, null);
        }
        logger.LogDebug("Password verify was success");
        return (true, user);
    }

}
