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

    public IList<GameDto>? GetFavoritesFromUser(int count) => DeveloperMap();

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
