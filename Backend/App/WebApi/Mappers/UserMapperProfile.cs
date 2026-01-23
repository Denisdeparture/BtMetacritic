using AutoMapper;
using Data.Models.Dto;
using WebApi.Models;

namespace WebApi.Mappers;

public class UserMapperProfile : Profile
{
    public UserMapperProfile() => CreateMap<RegisterRequestModel, UserDto>()
              .ForMember(x => x.Email, opt => opt.MapFrom(o => o.Email))
              .ForMember(x => x.NormalizedUserName, opt => opt.MapFrom(src => src.Name));
}
