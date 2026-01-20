using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BuisnessLogic.Interfaces;
using Data.Models.Dto;

namespace BuisnessLogic.Services;
public class FavoriteService(UnitOfWork work) : IFavoriteService
{
   
    public async Task<IList<GameDto>?> GetFavoritesFromUser(int count)
    {
        var objs = await work.User.GetAllAsync();

        if (objs is null)
        {
            return null;
        }
        IList<GameDto>? repeat;
        IList<GameDto> favorites;
        int oldcount = 0;
        do
        {
            oldcount = count;

            var users = objs.Reverse().Select(x => x as UserDto);

            favorites = users.Where(x => x!.GamesWhichLiked != null).Take(count).SelectMany(x => x.GamesWhichLiked!).ToList();

            repeat = favorites.GroupBy(x => x).Where(g => g.Count() > 1).Select(x => x.Key).ToList();

            count+=count;

        } while ( oldcount >= favorites.Count | (repeat is null || repeat.Count < oldcount) );

        return DeveloperMap();
    }

    public List<GameDto> DeveloperMap()
    {
        List<GameDto> list =
        [
           new GameDto(){ Id = 2767030, Title = "Marvel rivals" },
           new GameDto(){ Id = 367520, Title = "Hollow knight" }
        ];
        return list;
    }
}
