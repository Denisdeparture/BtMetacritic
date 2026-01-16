using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;
[Route("auth")]
public class AuthController : ControllerBase
{
    // Token Service watch on your old projects
    [Route("sign-in")]
    [HttpPost]
    public IActionResult Login()
    {

    }
    [Route("sign-up")]
    [HttpGet]
    public IActionResult Register()
    {

    }
}
