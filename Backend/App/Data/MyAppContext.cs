using Data.Models;
using Data.Models.Dto;
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

    public DbSet<RefreshTokenModel> Tokens => Set<RefreshTokenModel>();
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
        modelBuilder.Entity<UserDto>().
            HasMany(x => x.RefreshTokens)
            .WithOne(x => x.User)
            .HasForeignKey(x => x.UserId)
            .IsRequired();
    }
}
