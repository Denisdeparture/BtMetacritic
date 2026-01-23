using System;
using AutoMapper;
using BuisnessLogic.Models.SteamApi;
using BuisnessLogic.Models.SteamApi.Group;
using Data.Models.Dto;

namespace WebApi.Mappers;

public class GameMapperProfile : Profile
{
    public GameMapperProfile() => CreateMap<GameItemModel, GameDto>()
            .ForMember(obj => obj.Title, opt => opt.MapFrom(x => x.name))
            .ForMember(obj => obj.Id, opt => opt.MapFrom(x => x.id));
}
