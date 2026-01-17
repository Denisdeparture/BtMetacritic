using Data.Models.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Interfaces
{
    public interface IUserRepository
    {
        public List<UserDto> GetUsers();
        public UserDto GetUser(int id);

        public void AddUser(UserDto user);

        public void UpdateUser(int userId, UserDto newData);

        public void DeleteUser(int userId); 

    }
}
