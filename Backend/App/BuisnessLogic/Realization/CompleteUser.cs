using CodeGenerator.Data;
using Data.Dto;
using Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnitOfWorkUpgrade.Realization;

public class CompleteUser() : IWorker<UserDto>
{
    public void Add(UserDto data) => throw new NotImplementedException();
    public void AddUser(UserDto user) => throw new NotImplementedException();
    public void Delete(int id) => throw new NotImplementedException();
    public void DeleteUser(int userId) => throw new NotImplementedException();



    public UserDto Get(int id) => throw new NotImplementedException();
    public IList<UserDto> GetAll() => throw new NotImplementedException();
    public UserDto GetUser(int id) => throw new NotImplementedException();
    public List<UserDto> GetUsers() => throw new NotImplementedException();
    public void Update(int id, UserDto newdata) => throw new NotImplementedException();

    public void UpdateUser(int userId, UserDto newData) => throw new NotImplementedException();
}
