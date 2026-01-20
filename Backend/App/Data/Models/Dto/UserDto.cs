using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EntityFrameworkCore.Projectables;
using Microsoft.AspNetCore.Identity;

namespace Data.Models.Dto;

public class UserDto : IdentityUser<int>
{
    public string SaltForPassword { get; set; } = null!;
    public List<GameDto>? GamesWhichLiked { get; set; }
    public List<GameDto>? GamesWhichViewed { get; set; }

    public IList<RefreshTokenModel>? RefreshTokens { get; set; }

    public IList<OAuthProviderModel>? OAuthProviders { get; set; }

    [Projectable]
    public string FirstName => new string(NormalizedUserName!.TakeWhile(x => x != ' ').ToArray()); 

    [Projectable]
    public string LastName => new string(NormalizedUserName!.SkipWhile(x => x !=  ' ').Skip(1).ToArray());

    public string? ImgPath { get; set; }

    public string? Region {  get; set; }
    public int Age { get; set; }

}
