using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BuisnessLogic.Interfaces;
using BuisnessLogic.Models;
using Data.Models.Dto;

namespace BuisnessLogic.Services.Security;

public static class JwtCreator
{
    public static string CreateAccessToken(UserDto user, IJwtManager manager)
    {
        var jwt =  manager.CreateJwtTokenForUser(user);
        var token = new JwtSecurityTokenHandler().WriteToken(jwt);
        return token;
    }
}
