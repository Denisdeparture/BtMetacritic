using CodeGenerator.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnitOfWorkUpgrade.Realization
{
    internal class CompleteGame() : IWorker
    {
        public Task Task { get; set; }
        public CancellationTokenSource CancellationTokenSource { get; set; }
        public void Run()
        {
           
        }

        public void Stop()
        {
            
        }
    }
}
