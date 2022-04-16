using Kanoq.BLL.Interfaces;
using Kanoq.DAL;
using Kanoq.Repositories;
using Kanoq.Repositories.Generic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kanoq.BLL
{
    public class ClientManager : IClientManager
    {
        private readonly IUnitOfWork UnitOfWork;
        public ClientManager (IUnitOfWork unitOfWork)
        {
            UnitOfWork = unitOfWork;            
        }
        public IList<Client> GetClients()
        {
            return UnitOfWork.Clients.GetAll().ToList();
        }
    }
}
