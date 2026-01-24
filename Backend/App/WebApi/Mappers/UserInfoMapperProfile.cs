using AutoMapper;
using Data.Models.Dto;
using WebApi.Models;

namespace WebApi.Mappers;

public class UserInfoMapperProfile : Profile
{
    public UserInfoMapperProfile() => CreateMap<UserDto, SimpleUserInfo>()
            .ForMember(x => x.firstname, opt => opt.MapFrom(src => src.FirstName))
            .ForMember(x => x.lastname, opt => opt.MapFrom(src => src.LastName))
            .ForMember(x => x.age, opt => opt.MapFrom(src => src.Age))
            .ForMember(x => x.location, opt => opt.MapFrom(src => src.Region))
            .ForMember(x => x.email, opt => opt.MapFrom(src => src.Email)
            );
}
