using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuisnessLogic.Models;

public class TrigrammOptions
{
    public int LengthTrigramm { get; set; }

    public uint PercentOfClip { get; set; } /// 0 - 100%, all more is 100

    public int RoundingFactor { get; set; }

    public int MaxSuccessResults { get; set; }

    public static TrigrammOptions GetBasicModel() => new TrigrammOptions { LengthTrigramm = 3, PercentOfClip = 50, RoundingFactor = 3, MaxSuccessResults = 2 };

}
