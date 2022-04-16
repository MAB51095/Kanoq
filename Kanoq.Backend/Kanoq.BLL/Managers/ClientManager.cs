using AutoMapper;
using Kanoq.BLL.Interfaces;
using Kanoq.DAL;
using Kanoq.Repositories;
using Kanoq.Repositories.Generic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain = Kanoq.Domain;

namespace Kanoq.BLL.Managers
{
    public class ClientManager : IClientManager
    {
        private readonly IUnitOfWork UnitOfWork;
        public ClientManager (IUnitOfWork unitOfWork)
        {
            UnitOfWork = unitOfWork;            
        }
        public IList<Domain.Client> GetClients()
        {
            var clients = UnitOfWork.Clients.GetAll().ToList();
            return Mapper.Map<List<Client>, List<Domain.Client>>(clients);
        }
    }
}
