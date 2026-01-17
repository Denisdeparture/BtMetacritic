using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace BuisnessLogic.Models;
public class UserModel
{
    public SimpleUserInfo? Info { get; set; }
    public string? ImgPath { get; set; }
}
public record class SimpleUserInfo(string location, string firstname, string lastname, int age, string mail);
