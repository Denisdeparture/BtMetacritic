using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CodeGenerator.Data;

public interface IWorker
{
    Task AddAsync(object data);
    Task<object?> GetAsync(int id);

    Task<IList<object>?> GetAllAsync();
    void UpdateAsync(int id, object newdata);

    Task DeleteAsync(int id);
}
