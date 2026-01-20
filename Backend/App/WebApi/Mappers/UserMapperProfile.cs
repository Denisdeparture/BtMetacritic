using AutoMapper;
using Data.Models.Dto;
using WebApi.Models;

namespace WebApi.Mappers;

public class UserMapperProfile : Profile
{
    public UserMapperProfile()
    {
        CreateMap<RegisterRequestModel, UserDto>()
              .ForMember(x => x.Email, opt => opt.MapFrom(o => o.Email))
              .ForMember(x => x.NormalizedUserName, opt => opt.MapFrom(src => src.Name));

        CreateMap<UserModel, UserDto>()
             .ForMember("ImgPath", opt => opt.MapFrom(src => src.ImgPath))
             .ForMember("Region", opt => opt.MapFrom(src => src.Info.Region))
             .ForMember("FirstName", opt => opt.MapFrom(src => src.Info.Firstname))
             .ForMember("LastName", opt => opt.MapFrom(src => src.Info.Lastname))
             .ForMember("Age", opt => opt.MapFrom(src => src.Info.Age))
             .ForMember("Email", opt => opt.MapFrom(src => src.Info.Mail)
             );
    }
}
