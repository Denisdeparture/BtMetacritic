using System.Text;
using BuisnessLogic;
using BuisnessLogic.Interfaces;
using BuisnessLogic.Interfaces.Security;
using BuisnessLogic.Models.SteamApi;
using BuisnessLogic.Services;
using BuisnessLogic.Services.Security;
using CodeGenerator.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace WebApi.Extensions;

public static class ServicesExtensions
{
    public static IServiceCollection AddSteamApi(this IServiceCollection services) => services.AddTransient<ISteamApi, SteamApi>();

    public static IServiceCollection AddAuth(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddTransient<IJwtManager, JwtManager>();

        services.AddAuthentication(opt =>
        {
            opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(options => options.TokenValidationParameters = new TokenValidationParameters()
        {
            RequireExpirationTime = true,
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidIssuer = configuration["JwtSettings:Issuer"],
            ValidAudience = configuration["JwtSettings:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JwtSettings:SecurityKey"]!)),
            ValidateIssuerSigningKey = true,
        }).AddBearerToken(IdentityConstants.BearerScheme);

        return services;
    }
    public static IServiceCollection AddEncrypt(this IServiceCollection services) => services.AddTransient<EncryptionService>();
    public static IServiceCollection AddSearch(this IServiceCollection services)  => services.AddTransient<TrigramSearchService>();
    public static IServiceCollection AddTokeniserService(this IServiceCollection services) => services.AddTransient<IRefresher, RefreshTokenService>();
    public static IServiceCollection AddUnitOfWork(this IServiceCollection services) => services.AddSingleton<UnitOfWork>();

}
