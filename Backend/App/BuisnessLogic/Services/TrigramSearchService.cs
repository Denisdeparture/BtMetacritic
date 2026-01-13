using BuisnessLogic.Interfaces;
using BuisnessLogic.Models;
using BuisnessLogic.Models.SteamApi.Group;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuisnessLogic.Services;

public class TrigramSearchService(ISteamApi steamApi, IOptions<TrigrammOptions>? options = null )
{
    private TrigrammOptions? settings { get; set; } = options?.Value;

    public async Task<List<GameItemModel>> GetSimilarResult(string searchName)
    {
        var trigramms = GetTrigramms(searchName);

        var listPotentialNames = await CompareTrigramms(trigramms);

        return listPotentialNames.Select(x => x.name).ToList();

    }
    private List<string> GetTrigramms(string name)
    {

        string str = name.Trim();

        if(options is null)
        {
            settings = TrigrammOptions.GetBasicModel();
        }

        var result = new List<string>();
        
        for(var counter = 0; counter < str.Length; counter++)
        {
            if (counter + settings.LengthTrigramm - 1 > str.Length)
            { break; }

            var newTrigramm = $"{str[counter]}{str.Substring(counter, settings.LengthTrigramm - 1)}";

            result.Add(newTrigramm);
        }

        return result.Distinct().ToList();
    }
    private async Task<List<ChanceModel>> CompareTrigramms(List<string> trigramms)
    {
        var resForComparer = new List<(string, string[], GameItemModel[])>();

        foreach(var item in trigramms)
        {
            var resInStorage = await steamApi.GetGameByNameAsync(item); // потенциально здесь может быть запрос к бд

            resForComparer.Add((item, trigramms.Where(x => x != item).ToArray(), resInStorage.ToArray()));

        }
        var listOfGameAndChance = new List<ChanceModel>();
        foreach(var res in resForComparer)
        {
            foreach(var info in res.Item3)
            {
                var chance = CompareResults(res.Item1, res.Item2, info);

                listOfGameAndChance.Add(new ChanceModel(chance, info));
            }
        }

        return listOfGameAndChance.OrderByDescending(x => x.chance).Take(settings!.MaxSuccessResults).ToList();
    }
   
    private double CompareResults(string nowTrigramm, string[] otherTriggramm, GameItemModel info)
    {
        List<(string[], string)> values = new List<(string[], string)>();

        string[] trigramms = [nowTrigramm, ..otherTriggramm];

        double multiplayer = 1 / trigramms.Length;

        double result = 0;

        if (info.name.Contains(nowTrigramm))
        { result += multiplayer; }

        foreach(var item in otherTriggramm)
        {
            if (info.name.Contains(item))
            { result += multiplayer; }
        }

        return Math.Round(result,settings.RoundingFactor);
    }


}
public record class ChanceModel(double chance, GameItemModel name);
