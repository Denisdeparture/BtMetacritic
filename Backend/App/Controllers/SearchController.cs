using Microsoft.AspNetCore.Mvc;
[Route("search")]
public class SearchController : ControllerBase
{
    [HttpGet]
    public IActionResult Index(string gameName)
    {

    }
}