using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data.Models.Dto;

namespace Data.Models;
public class OAuthProviderModel
{
    public int Id { get; set; }
    public string? Provider { get; set; }
    public string? JwtId { get; set; }
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int UserId { get; set; }
    public UserDto? User { get; set; }
}
