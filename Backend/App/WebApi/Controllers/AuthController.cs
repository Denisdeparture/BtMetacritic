using System.Threading.Tasks;
using BuisnessLogic;
using BuisnessLogic.Services;
using CodeGenerator.Data;
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
        // mapping to dto by using auto mapper

        await unitOfWork.User.AddAsync();
    }
    [Route("unsign-in")]
    [HttpPost]
    public IActionResult Logout() => throw new NotImplementedException();
    [Route("sign-up")]
    [HttpPost]
    public IActionResult Register()
    {
        throw new NotImplementedException();
    }

}
