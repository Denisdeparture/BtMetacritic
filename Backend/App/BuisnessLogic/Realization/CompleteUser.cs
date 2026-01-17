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
    public async Task AddAsync(object obj)
    {

        UserDto data = (UserDto)obj;

        using var ctx = await ctxFactory.CreateDbContextAsync();

        ctx.Users.Add(data);

        await ctx.SaveChangesAsync();
    }
    public async Task DeleteAsync(int id)
    {
        using var ctx = await ctxFactory.CreateDbContextAsync();

        var user = await GetAsync(id) ?? throw new NullReferenceException("User was null, when try delete operation");

        ctx.Users.Remove((UserDto)user);

        await ctx.SaveChangesAsync();
       
    }
    public async Task<object?> GetAsync(int id)
    {
        using var ctx = await ctxFactory.CreateDbContextAsync();

        var users = await GetAllAsync();

        if(users is null)
        {
            return null;
        }

        var user = users.Select(x => (UserDto)x).Where(x => x.Id == id).SingleOrDefault();

        return user;
    }
    public async Task<IList<object>?> GetAllAsync()
    {
        using var ctx = await ctxFactory.CreateDbContextAsync();

        return await ctx.Users.Select(x => (object)x).AsNoTracking().ToListAsync();
    }
    public async void UpdateAsync(int id, object obj)
    {
        UserDto newdata = (UserDto)obj;


        using var ctx = await ctxFactory.CreateDbContextAsync();

        var user = await GetAsync(id) ?? throw new NullReferenceException("User was null, when try update operation");

        foreach (var prop in user.GetType().GetFields())
        {
            var propWithReq = newdata.GetType().GetFields().Where(x => x.Name == prop.Name).SingleOrDefault();

            prop.SetValue(user, propWithReq!.GetValue(newdata));
        }

        ctx.SaveChanges();
    }

}
