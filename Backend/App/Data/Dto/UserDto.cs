using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Data.Dto;

public class UserDto : IdentityUser<int>
{
    public string SaltForPassword { get; set; } = null!;
    public List<GameDto>? GamesWhichLiked { get; set; }

}
