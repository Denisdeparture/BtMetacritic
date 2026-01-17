
using BuisnessLogic.Models;
using CodeGenerator.Data;
using Data.Models.Dto;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Security.Claims;
using System.Text;

namespace BuisnessLogic.Services;

public class JwtManager(IConfiguration _configuration)
{
    public JwtSecurityToken CreateJwtTokenForUser(UserDto user)
    {
        var jwt = new JwtSecurityToken(issuer: _configuration["JwtSettings:Issuer"],
        audience: _configuration["JwtSettings:Audience"],
        expires: DateTime.Now.AddMinutes(double.Parse(_configuration["JwtSettings:ExpirationTimeInMinutes"]!)),
        claims: GetClaims(user),
        signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecurityKey"]!)), SecurityAlgorithms.HmacSha256)
        ); ;
        return jwt;
    }
    private List<Claim> GetClaims(UserDto user)
    {
        List<Claim> claims = new List<Claim>()
        {
            new Claim(ClaimTypes.Email, user.Email!),
            new Claim(AppClaimsType.NickName, user.FirstName + " " + user.LastName ?? string.Empty)
        };
        return claims;
    }
}
