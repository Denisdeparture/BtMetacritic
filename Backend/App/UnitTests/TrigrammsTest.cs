using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BuisnessLogic.Interfaces;
using BuisnessLogic.Models.SteamApi.Group;
using BuisnessLogic.Services;
using Moq;

namespace UnitTests;

public class TrigrammsTest
{

    private TrigramSearchService searchService {  get; set; }

    private readonly Mock<ISteamApi> mockSteamApi = new Mock<ISteamApi>();

    public TrigrammsTest()
    {
        // Arrange
       
            IList<GameItemModel> listGame = [
                new GameItemModel() { name = "Дружба", id = 0 },
            new GameItemModel() { name = "Руж", id = 1},
            new GameItemModel() { name = "Да", id = 2 }
                ];
        // эта херня

        mockSteamApi.Setup(x => x.GetGameByNameAsync(It.IsAny<string>(), It.IsAny<int>(), It.IsAny<string>())).ReturnsAsync(() => listGame);
        searchService = new TrigramSearchService(mockSteamApi.Object);
    }

    [Fact]
    public async Task MakeTriggramsOnOtherWordsTest()
    {
        // Act
        var steamApi = mockSteamApi.Object;
        var result = await searchService.GetSimilarResult("Рдужба");

        //Assert
        Assert.Contains("Дружба", result.Select(x => x.name));
    }
}
