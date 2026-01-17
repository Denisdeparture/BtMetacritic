using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Data;
using Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace BuisnessLogic.Services;
public class RefreshTokenService(IDbContextFactory<MyAppContext> ctxFactory, IConfiguration _configuration)
{
    public async Task<string> GenerateRefreshToken(int userId)
    {
        using var ctx = await ctxFactory.CreateDbContextAsync();

        var tokenId = Guid.NewGuid().ToString();

        var refreshToken = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));

        var expiryDays = Convert.ToInt32(_configuration["JwtSettings:RefreshTokenExpiryDays"]);
        var expiryDate = DateTime.UtcNow.AddDays(expiryDays);

        var token = new RefreshTokenModel
        {
            UserId = userId,
            TokenId = tokenId,
            RefreshToken = refreshToken
        };

        ctx.Tokens.Add(token);
        ctx.SaveChanges();

        return refreshToken;
    }

    public async Task<RefreshTokenModel?> GetRefreshToken(string refreshToken)
    {
        using var ctx = await ctxFactory.CreateDbContextAsync();

        return ctx.Tokens.FirstOrDefault(rt => rt.RefreshToken == refreshToken);
    }

    public async void RevokeRefreshToken(string refreshToken)
    {
        using var ctx = await ctxFactory.CreateDbContextAsync();


        var token = ctx.Tokens.FirstOrDefault(rt => rt.RefreshToken == refreshToken);

        if (token is not null)
        {
            ctx.Tokens.Remove(token);
            ctx.SaveChanges();
        }
    }
}
