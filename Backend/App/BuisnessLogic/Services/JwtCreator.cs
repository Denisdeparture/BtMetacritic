using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BuisnessLogic.Models;

namespace BuisnessLogic.Services;

public static class JwtCreator
{
    public static string CreateAccessToken(UserModel user, JwtManager manager)
    {
        var jwt =  manager.CreateJwtTokenForUserAsync(user);
        var token = new JwtSecurityTokenHandler().WriteToken(jwt);
        return token;
    }
}
