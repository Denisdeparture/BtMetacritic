using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data.Models.Dto;

namespace BuisnessLogic.Interfaces;
public interface IJwtManager
{
    JwtSecurityToken CreateJwtTokenForUser(UserDto user);
}
