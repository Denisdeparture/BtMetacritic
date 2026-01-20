using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BuisnessLogic.Models.SteamApi.Group;

namespace BuisnessLogic.Interfaces;
public interface IAlgorithmSearch<T>
{
    Task<List<T>> GetSimilarResult(string searchObj);
}
