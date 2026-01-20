using System.Text.Json.Serialization;

namespace WebApi.Models;

public class UserModel
{
    public int Id { get; set; }
    public SimpleUserInfo Info { get; set; }         
    public string ImgPath { get; set; }                
}
public class SimpleUserInfo
{
    [JsonPropertyName("location")]
    public string Region { get; set; }
    public string Firstname { get; set; }
    public string Lastname { get; set; }
    public int Age { get; set; }
    public string Mail { get; set; }
}
