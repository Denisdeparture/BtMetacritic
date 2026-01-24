using Data.Models.Dto;
using WebApi.Models;
using AutoMapper;
namespace WebApi.Mappers;

public class UserDtoMapperProfile : Profile
{
    public UserDtoMapperProfile() => CreateMap<UserModel, UserDto>()
          .ForMember(x => x.ImgPath, opt => opt.MapFrom(src => src.imgPath))
          .ForMember(x => x.Region, opt => opt.MapFrom(src => src.info.location))
          .ForMember(x => x.NormalizedUserName, opt => opt.MapFrom(src => src.info.firstname + " " + src.info.lastname))
          .ForMember(x => x.Age, opt => opt.MapFrom(src => src.info.age)
          );
}
