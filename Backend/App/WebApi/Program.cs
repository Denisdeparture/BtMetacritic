using System.Text;
using Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Scalar.AspNetCore;

namespace WebApi;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        builder.Configuration.AddJsonFile("jwtSecurityKey.json"); // You should create this file with your jwt key for test
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddOpenApi();
        builder.Services.AddControllers();
        builder.Services.AddCors(options => options.AddPolicy(name: "MyAllowSpecificOrigins",
                                      org => org.WithOrigins(
                                                 builder.Configuration.GetValue<string>("ClientHost")!)
                                                 .AllowAnyHeader()
                                                 .AllowAnyMethod()));
        builder.Services.AddDbContextFactory<MyAppContext>(opts => opts.UseSqlite("TestDataBase").UseProjectables());
        builder.Services.AddAuthentication(opt =>
        {
            opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(options => options.TokenValidationParameters = new TokenValidationParameters()
        {
            RequireExpirationTime = true,
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
            ValidAudience = builder.Configuration["JwtSettings:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:SecurityKey"]!)), 
            ValidateIssuerSigningKey = true,
        }).AddBearerToken(IdentityConstants.BearerScheme);
        var app = builder.Build();

        app.UseCors("MyAllowSpecificOrigins");

        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
            app.UseSwagger(opt => opt.RouteTemplate = "openapi/{documentName}.json");
            app.MapScalarApiReference(opt =>
            {
                opt.Title = "Test bt metacriitc infrastructure";
                opt.Theme = ScalarTheme.Mars;
                opt.DefaultHttpClient = new(ScalarTarget.Http, ScalarClient.Http11);
            });
        }
        app.UseHttpsRedirection();
        app.UseRouting();
        app.MapControllers();
        app.Run();
    }
}
