using Data.Dto;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data;

public class MyAppContext : DbContext
{
    public DbSet<UserDto> Users => Set<UserDto>();
    public DbSet<GameDto> Games => Set<GameDto>();
    protected MyAppContext(DbContextOptions<MyAppContext> options) : base(options)
    {
        if (!Database.EnsureCreated())
        {
            Database.EnsureCreated();
        }
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<UserDto>()
            .HasMany(x => x.GamesWhichLiked)
            .WithMany(x => x.UserLikedIt)
            .UsingEntity(j => j.ToTable("GamesAndUser"));

    }
}
