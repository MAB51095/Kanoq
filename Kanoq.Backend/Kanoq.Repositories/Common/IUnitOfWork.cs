using Kanoq.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kanoq.Repositories.Common
{
    public interface IUnitOfWork : IDisposable
    {
        IClientRepository Clients { get; }
        IModelRepository Models { get; }
        ITailorRepository Tailors { get; }
        int Complete();
    }
}
