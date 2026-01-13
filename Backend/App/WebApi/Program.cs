using Scalar.AspNetCore;
using Microsoft.AspNetCore.OpenApi;
using Swashbuckle.AspNetCore;
using Microsoft.Extensions.DependencyInjection;
namespace WebApi;

public class Program
{
    public static void Main(string[] args)
    {
       
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddOpenApi();
        builder.Services.AddControllers();
        builder.Services.AddCors(options => options.AddPolicy(name: "MyAllowSpecificOrigins",
                                      org => org.WithOrigins(
                                                 builder.Configuration.GetValue<string>("ClientHost")!)
                                                 .AllowAnyHeader()
                                                 .AllowAnyMethod()));
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
