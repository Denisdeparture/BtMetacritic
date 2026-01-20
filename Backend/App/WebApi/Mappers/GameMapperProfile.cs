using System;
using AutoMapper;
using BuisnessLogic.Models.SteamApi;
using Data.Models.Dto;

namespace WebApi.Mappers;

public class GameMapperProfile : Profile
{
    public GameMapperProfile()
    {
        GameDto dto = new GameDto();

        CreateMap<GameInfoModel, GameDto>()
            .ForMember(obj => obj.Title, opt => opt.MapFrom(x => x.name))
            .ForMember(obj => obj.Id, opt => opt.MapFrom(x => x.steam_appid));
    }
}
