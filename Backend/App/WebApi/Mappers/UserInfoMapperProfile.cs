using AutoMapper;
using Data.Models.Dto;
using WebApi.Models;

namespace WebApi.Mappers;

public class UserInfoMapperProfile : Profile
{
    public UserInfoMapperProfile() => CreateMap<UserDto, SimpleUserInfo>()
            .ForMember(x => x.Firstname, opt => opt.MapFrom(src => src.FirstName))
            .ForMember(x => x.Lastname, opt => opt.MapFrom(src => src.LastName))
            .ForMember(x => x.Age, opt => opt.MapFrom(src => src.Age))
            .ForMember(x => x.Region, opt => opt.MapFrom(src => src.Region));
}
