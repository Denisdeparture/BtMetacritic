using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuisnessLogic.Models;
public class ProviderModel
{
    public string? JwtId { get; set; }

    public required string Email { get; set; }

    public string? Provider { get; set; }
}
