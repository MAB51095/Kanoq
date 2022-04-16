using Kanoq.BLL;
using Kanoq.BLL.Interfaces;
using Kanoq.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;


namespace Kanoq.Api.Controllers
{
    
    public class ClientController : ApiController
    {
        // GET: Client
        private readonly IClientManager ClientManager;
        public ClientController(IClientManager clientManager)
        {
            ClientManager = clientManager;
        }
        public IEnumerable<Client> Get()
        {
            var clients = ClientManager.GetClients();
            return clients;
        }
    }
}