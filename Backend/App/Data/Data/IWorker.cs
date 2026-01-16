using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CodeGenerator.Data;

public interface IWorker<T>
{
    Task AddAsync(T data);
    Task<T?> GetAsync(int id);

    Task<IList<T>?> GetAllAsync();
    void UpdateAsync(int id, T newdata);

    Task DeleteAsync(int id);
}
