using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using BuisnessLogic.Interfaces.Security;
using BuisnessLogic.Models;
using Data;
using Data.Models;
using Data.Models.Dto;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace BuisnessLogic.Services.Security;
public class RefreshTokenService(IDbContextFactory<MyAppContext> ctxFactory, IConfiguration _configuration, UnitOfWork worker) : IRefresher
{
    public async Task<string> GenerateRefreshTokenAsync(int userId)
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

    public async Task<RefreshTokenModel?> GetRefreshTokenAsync(string refreshToken)
    {
        using var ctx = await ctxFactory.CreateDbContextAsync();

        return ctx.Tokens.FirstOrDefault(rt => rt.RefreshToken == refreshToken);
    }

    public async void RevokeRefreshTokenAsync(string refreshToken)
    {
        using var ctx = await ctxFactory.CreateDbContextAsync();


        var token = ctx.Tokens.FirstOrDefault(rt => rt.RefreshToken == refreshToken);

        if (token is not null)
        {
            ctx.Tokens.Remove(token);
            ctx.SaveChanges();
        }
    }
    public async Task<UserDto> FindOrCreateUserByProviderId(ProviderModel model)
    {
        using var ctx = await ctxFactory.CreateDbContextAsync();

        var obj = await worker.User.GetAsync<string>("Email", model.Email);

        if (obj is not UserDto user)
        {
            var task =  worker.User.AddAsync(new UserDto()
            {
                Email = model.Email,
            });

            task.Wait();

            obj = await worker.User.GetAsync<string>("Email", model.Email);

            user = (obj as UserDto)!;
        }

        user.OAuthProviders ??= new List<OAuthProviderModel>();

        var provider = user.OAuthProviders.LastOrDefault(x => x.Provider == model.Provider);

        if(provider is null)
        {
            user.OAuthProviders.Add(new OAuthProviderModel()
            {
                Provider = model.Provider,
                JwtId = model.JwtId,
                User = user,
                UserId = user.Id,
            });
        }
        else
        {
            provider.JwtId = model.JwtId;
            ctx.OAuthProviders.Update(provider);
            ctx.SaveChanges();
        }

        worker.User.UpdateAsync(user.Id, user);

        return user;

    }
}
