using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CodeGenerator.Data;

public interface IWorker<T>
{
    void Add(T data);
    T Get(int id);

    IList<T> GetAll();
    void Update(int id, T newdata);

    void Delete(int id);
}
