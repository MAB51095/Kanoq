using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using Kanoq.Repositories.Interfaces;
using Kanoq.DAL;
using Kanoq.DAL.Interfaces;
using Kanoq.Repositories.Implementations;

namespace Kanoq.Repositories.Generic
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly KanoqDbContext KanoqDBContext;
        public IClientRepository Clients { get; }
        public ITailorRepository Tailors { get; }
        public IModelRepository Models { get; }

        public UnitOfWork(IKanoqDbContext kanoqDBContext)
        {
            KanoqDBContext = (KanoqDbContext)kanoqDBContext;
            Clients = new ClientRepository(KanoqDBContext);
            Tailors = new TailorRepository(KanoqDBContext);
            Models = new ModelRepository(KanoqDBContext);
        }

        public int Complete()
        {
            return KanoqDBContext.SaveChanges();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                KanoqDBContext.Dispose();
            }
        }
    }
}

