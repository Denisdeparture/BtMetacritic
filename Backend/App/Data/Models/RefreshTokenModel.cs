using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data.Models.Dto;

namespace Data.Models;
public class RefreshTokenModel
{
    public int Id { get; set; }
    public int UserId { get; set; } 
    public string? TokenId { get; set; }
    public string RefreshToken { get; set; } = null!;
    public UserDto? User { get; set; }  
}
