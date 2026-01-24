using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using CodeGenerator.Data;
using Data;
using Data.Interfaces;
using Data.Models.Dto;
using Microsoft.EntityFrameworkCore;

namespace UnitOfWorkUpgrade.Realization;

public class CompleteUser(IDbContextFactory<MyAppContext> ctxFactory) : IWorker
{
    public async Task<object?> AddAsync(object obj)
    {

        UserDto data = (UserDto)obj;

        using var ctx = await ctxFactory.CreateDbContextAsync();

        ctx.Users.Add(data);

        ctx.SaveChanges();

        return data;
    }
    public async Task DeleteAsync(int id)
    {
        using var ctx = await ctxFactory.CreateDbContextAsync();

        var user = await GetAsync<UserDto, int>(x => x.Id,id) as UserDto ?? throw new NullReferenceException("User was null, when try delete operation");

        ctx.Users.Remove(user);

        await ctx.SaveChangesAsync();
       
    }
    // Прямо как в automapper :)
    public async Task<object> GetAsync<T, Property>(Expression<Func<T, Property>> param,object obj) 
    {
        using var ctx = await ctxFactory.CreateDbContextAsync();


        if (param.Body is MemberExpression memberExpr)
        {
            var memberInfo = memberExpr.Member;
            if (memberInfo is PropertyInfo propInfo)
            {
                var users = ctx.Users.Include(x => x.GamesWhichLiked).Include(x => x.GamesWhichViewed).ToList();

                var user = users.Where(x => x.GetType().GetProperty(memberInfo.Name)!.GetValue(x)!.Equals(obj)).SingleOrDefault();

                return user;
            }
        }
        return null;

    }
    public async Task<object?> GetAsync<T>(string param, T value)
    {
        using var ctx = await ctxFactory.CreateDbContextAsync();

        var users = await GetAllAsync();

        if (users is null)
        {
            return null;
        }

        var usersDto = users.Select(x => (UserDto)x);

        var user = usersDto.Select(x => x.GetType().GetProperties().First(x => x.Name == param).GetValue(x)).Where(v => ((T)v).Equals(value));



        return user;
    }
    public async Task<IList<object>> GetAllAsync()
    {
        using var ctx = await ctxFactory.CreateDbContextAsync();

        return await ctx.Users.Select(x => (object)x).AsNoTracking().ToListAsync();
    }
    public async void UpdateAsync(int id, object obj)
    {
        UserDto newdata = (UserDto)obj;


        using var ctx = await ctxFactory.CreateDbContextAsync();

        var user = await GetAsync<UserDto, int>(x => x.Id, id) as UserDto ?? throw new NullReferenceException("User was null, when try update operation");

        foreach (var prop in user.GetType().GetProperties())
        {
            var propWithReq = newdata.GetType().GetProperties().Where(x => x.Name == prop.Name).SingleOrDefault();

            if (propWithReq!.GetValue(newdata) is null)
            {
                continue;
            }

            if( prop.SetMethod is null)
            {
                continue;
            }

            prop.SetValue(user, propWithReq!.GetValue(newdata));
        }

        Console.WriteLine(user.Region);

        ctx.Users.Update(user);

        ctx.SaveChanges();
    }

}
