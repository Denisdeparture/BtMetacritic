using System.Text;
using System.Text.Json.Serialization;
using BuisnessLogic.Models;
using BuisnessLogic.Realization;
using Data;
using Data.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Serialization;
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

        builder.Services.AddHttpClient();

        builder.Services.AddSwaggerGen();

        builder.Services.AddOptions<SearchOptions>().BindConfiguration(nameof(SearchOptions));

        builder.Services.AddTransient<IGameRepository, UserGameRepository>();

        builder.Services.AddOpenApi();

        builder.Services.AddAutoMapper(typeof(GameMapperProfile), typeof(UserMapperProfile), typeof(UserInfoMapperProfile), typeof(UserDtoMapperProfile));

        builder.Services.AddControllers()
            .AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());

        builder.Services.AddCors(options => options.AddPolicy(name: "MyAllowSpecificOrigins",
                                      org => org.WithOrigins(
                                                 builder.Configuration.GetValue<string>("ClientHost")!)
                                                 .AllowAnyHeader()
                                                 .AllowAnyMethod()));
        builder.Services.AddDbContextFactory<MyAppContext>(opts => opts.UseSqlite($"Data source={Environment.CurrentDirectory}\\dbmain.db;").UseProjectables());

        builder.Services.AddAuth(builder.Configuration);

        builder.Services.AddSteamApi();

        builder.Services.AddEncrypt();

        builder.Services.AddFavoriteService();


        builder.Services.AddTokeniserService();

        builder.Services.AddSearch();

        builder.Services.AddUnitOfWork();

        var app = builder.Build();

        app.MapControllers();
        app.UseRouting();
        
        if (app.Environment.IsDevelopment())
        {
            app.MapGet("/", (context) => context.Response.WriteAsync("Hello world!"));

            app.UseDeveloperExceptionPage();

            app.MapOpenApi();
            //app.UseSwagger();
            //app.UseSwaggerUI(options => // UseSwaggerUI is called only in Development.
            //{
            //    options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
            //    options.RoutePrefix = string.Empty;
            //});
            app.MapScalarApiReference(opt =>
            {
                opt.Title = "Test bt metacriitc infrastructure";
                opt.Theme = ScalarTheme.Moon;
                opt.DefaultHttpClient = new(ScalarTarget.Http, ScalarClient.Http11);
            });
        }
        app.UseAuthorization();
        app.UseHttpsRedirection();
        app.UseCors("MyAllowSpecificOrigins");
        app.Run();
    }
}
