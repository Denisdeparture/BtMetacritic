using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data.Models.Dto;

namespace BuisnessLogic.Interfaces;
public interface IFavoriteService
{
   IList<GameDto>? GetFavoritesFromUser(int count);


}
