using System.Text;
using BuisnessLogic.Models;
using Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Scalar.AspNetCore;
using Serilog;
using WebApi.Extensions;
using WebApi.Mappers;

namespace WebApi;

public class Program
{
    public static void Main(string[] args)
    {
        Log.Logger = new LoggerConfiguration()
                            .Enrich.FromLogContext()
                            .WriteTo.Console()
                            .CreateLogger();

        var builder = WebApplication.CreateBuilder(args);

        builder.Logging.AddSerilog();

        builder.Logging.SetMinimumLevel(LogLevel.Debug);

        builder.Host.UseSerilog();

        builder.Configuration.AddJsonFile("jwtSecurityKey.json"); // You should create this file with your jwt key for test
       
        builder.Services.AddEndpointsApiExplorer();

        builder.Services.AddSwaggerGen();

        builder.Services.AddOptions<SearchOptions>().BindConfiguration(nameof(SearchOptions));


        builder.Services.AddOpenApi();

        builder.Services.AddAutoMapper(typeof(GameMapperProfile), typeof(UserMapperProfile));

        builder.Services.AddControllers();

        builder.Services.AddCors(options => options.AddPolicy(name: "MyAllowSpecificOrigins",
                                      org => org.WithOrigins(
                                                 builder.Configuration.GetValue<string>("ClientHost")!)
                                                 .AllowAnyHeader()
                                                 .AllowAnyMethod()));
        builder.Services.AddDbContextFactory<MyAppContext>(opts => opts.UseSqlite("TestDataBase").UseProjectables());

        builder.Services.AddAuth(builder.Configuration);

        builder.Services.AddSteamApi();

        builder.Services.AddEncrypt();

        builder.Services.AddTokeniserService();

        builder.Services.AddSearch();

        builder.Services.AddUnitOfWork();

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
