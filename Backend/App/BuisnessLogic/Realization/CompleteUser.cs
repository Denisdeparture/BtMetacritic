using System;
using System.Collections.Generic;
using System.Linq;
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

        await ctx.SaveChangesAsync();

        return data;
    }
    public async Task DeleteAsync(int id)
    {
        using var ctx = await ctxFactory.CreateDbContextAsync();

        var user = await GetAsync<int>("Id",id) ?? throw new NullReferenceException("User was null, when try delete operation");

        ctx.Users.Remove((UserDto)user);

        await ctx.SaveChangesAsync();
       
    }
    public async Task<object?> GetAsync<T>(string param,T value) 
    {
        using var ctx = await ctxFactory.CreateDbContextAsync();

        var users = await GetAllAsync();

        if(users is null)
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

        var user = await GetAsync<int>("Id", id) ?? throw new NullReferenceException("User was null, when try update operation");

        foreach (var prop in user.GetType().GetFields())
        {
            var propWithReq = newdata.GetType().GetFields().Where(x => x.Name == prop.Name).SingleOrDefault();

            prop.SetValue(user, propWithReq!.GetValue(newdata));
        }

        ctx.SaveChanges();
    }

}
