using System.Text.Json.Serialization;
using Newtonsoft.Json;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace WebApi.Models;

public class UserModel
{
    public int id { get; set; }
    public SimpleUserInfo info { get; set; }      
    public string? imgPath { get; set; }                
}
public class SimpleUserInfo
{
    public string? location { get; set; }
    public string? firstname { get; set; }
    public string? lastname { get; set; }
    public string? age { get; set; }

    public string? email { get; set; }
}

