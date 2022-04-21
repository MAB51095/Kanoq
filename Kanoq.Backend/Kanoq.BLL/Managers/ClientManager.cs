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
        
        public IList<Domain.Client> Get()
        {
            var clients = UnitOfWork.Clients.GetAll().ToList();
            return Mapper.Map<List<Client>, List<Domain.Client>>(clients);
        }
        public Domain.Client Get(Guid id)
        {
            var client = UnitOfWork.Clients.SingleOrDefault(c=>c.Id==id);           
            return Mapper.Map<Client, Domain.Client>(client);
        }

        public Domain.Client Insert(Domain.Client client)
        {
            if(client == null)
            {
                throw new Exception("Input Empty");
            }

            if(!(client.Id == Guid.Empty || client.Id == null))
            {
                throw new Exception("Input should not contain Id");
            }
            
            client.Id = Guid.NewGuid();
            
            UnitOfWork.Clients.Add(Mapper.Map<Domain.Client, Client>(client));
            
            UnitOfWork.Complete();
            
            return client;
        }
        public Domain.Client Update(Domain.Client client)
        {
            if (client.Id == Guid.Empty || client.Id == null)
            {
                throw new Exception("Input should contain Id");
            }

            var updatedClient = UnitOfWork.Clients.SingleOrDefault(c => c.Id == client.Id);

            if (updatedClient == null)
                throw new Exception("Entity Not Found");

            updatedClient.Name = client.Name ?? updatedClient.Name;
            updatedClient.PhoneNumber = client.PhoneNumber ?? updatedClient.PhoneNumber;
            updatedClient.Email = client.Email ?? updatedClient.Email;

            UnitOfWork.Complete();

            return Mapper.Map<Client,Domain.Client>(updatedClient);
            
        }
        
        public void  Delete(Guid id)
        {
            var client = UnitOfWork.Clients.SingleOrDefault(c => c.Id == id);

            if (client == null)
                throw new Exception("Entity Not Found");

            UnitOfWork.Clients.Remove(client);
            UnitOfWork.Complete();
        }
    }
}
