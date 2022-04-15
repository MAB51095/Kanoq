using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using Kanoq.Repositories.Interfaces;

namespace Kanoq.Repositories.Common
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly KanoqDBContext _kanoqDBContext;
        public IClientRepository Clients { get; }
        public ITailorRepository Tailors { get; }
        public IModelRepository Models { get; }

        public UnitOfWork(KanoqDBContext kanoqDBContext,
            IClientRepository clientRepository,
            ITailorRepository tailorRepository,
            IModelRepository modelRepository)
        {
            _kanoqDBContext = kanoqDBContext;
            Clients = clientRepository;
            Tailors = tailorRepository;
            Models = modelRepository;
        }

        public int Complete()
        {
            return _kanoqDBContext.SaveChanges();
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
                _kanoqDBContext.Dispose();
            }
        }
    }
}

