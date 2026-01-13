namespace BuisnessLogic.Models.SteamApi.Group;

public record class Agcom
{
    public string rating { get; set; }
    public string descriptors { get; set; }
}
public record class Cadpa
{
    public string rating { get; set; }
}
public record class Dejus
{
    public string rating { get; set; }
    public string descriptors { get; set; }
}
 public record class SteamGermany
{
    public string rating_generated { get; set; }
    public string rating { get; set; }
    public string required_age { get; set; }
    public string banned { get; set; }
    public string use_age_gate { get; set; }
    public string descriptors { get; set; }
}
public record class Usk
{
    public string rating { get; set; }
    public string descriptors { get; set; }
}
