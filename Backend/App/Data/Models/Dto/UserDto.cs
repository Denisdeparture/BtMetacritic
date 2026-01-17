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

    public ICollection<RefreshTokenModel>? RefreshTokens { get; set; }

    [Projectable]
    public string? FirstName => NormalizedUserName?.Split(" ")[0];

    [Projectable]
    public string? LastName => NormalizedUserName?.Split(" ")[1];


}
