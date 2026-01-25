using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace CodeGenerator.Data;

public interface IWorker
{
    Task<object?> AddAsync(object data);
    Task<object> GetAsync<T, Property>(Expression<Func<T, Property>> param, object obj);

    Task<object?> GetAsync<T>(string param, T value);

    Task<IList<object>> GetAllAsync();
    void UpdateAsync(int id, object newdata);

    Task DeleteAsync(int id);
}
