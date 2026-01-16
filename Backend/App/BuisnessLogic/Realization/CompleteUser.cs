using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CodeGenerator.Data;
using Data;
using Data.Dto;
using Data.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace UnitOfWorkUpgrade.Realization;

public class CompleteUser(IDbContextFactory<MyAppContext> ctxFactory) : IWorker<UserDto>
{
    public async Task AddAsync(UserDto data)
    {
        using var ctx = await ctxFactory.CreateDbContextAsync();

        ctx.Users.Add(data);

        await ctx.SaveChangesAsync();
    }
    public async Task DeleteAsync(int id)
    {
        using var ctx = await ctxFactory.CreateDbContextAsync();

        var user = await GetAsync(id) ?? throw new NullReferenceException("User was null, when try delete operation");

        ctx.Users.Remove(user);

        await ctx.SaveChangesAsync();
       
    }
    public async Task<UserDto?> GetAsync(int id)
    {
        using var ctx = await ctxFactory.CreateDbContextAsync();

        var users = await GetAllAsync();

        var user = users.Where(x => x.Id == id).SingleOrDefault();

        return user;
    }
    public async Task<IList<UserDto>> GetAllAsync()
    {
        using var ctx = await ctxFactory.CreateDbContextAsync();

        return await ctx.Users.AsNoTracking().ToListAsync();
    }
    public async void UpdateAsync(int id, UserDto newdata)
    {
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
