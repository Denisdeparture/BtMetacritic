using Data.Models.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Interfaces;

public interface IUserRepository
{
    List<UserDto> GetUsers();
    UserDto GetUser(int id);

    void AddUser(UserDto user);

    void UpdateUser(int userId, UserDto newData);

    void DeleteUser(int userId); 

}
