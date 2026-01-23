using Data.Models.Dto;
using WebApi.Models;
using AutoMapper;
namespace WebApi.Mappers;

public class UserDtoMapperProfile : Profile
{
    public UserDtoMapperProfile() => CreateMap<UserModel, UserDto>()
          .ForMember("ImgPath", opt => opt.MapFrom(src => src.ImgPath))
          .ForMember(x => x.Region, opt => opt.MapFrom(src => src.Info.Region))
          .ForMember(x => x.NormalizedUserName, opt => opt.MapFrom(src => src.Info.Firstname + " " + src.Info.Lastname))
          .ForMember("Age", opt => opt.MapFrom(src => src.Info.Age)
          );
}
