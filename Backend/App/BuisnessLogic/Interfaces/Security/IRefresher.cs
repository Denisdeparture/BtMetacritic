using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data.Models;

namespace BuisnessLogic.Interfaces.Security;
public interface IRefresher
{
    Task<string> GenerateRefreshTokenAsync(int userId);
    Task<RefreshTokenModel?> GetRefreshTokenAsync(string refreshToken);
    void RevokeRefreshTokenAsync(string refreshToken);
}
