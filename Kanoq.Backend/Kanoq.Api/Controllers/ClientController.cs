using Kanoq.BLL;
using Kanoq.BLL.Interfaces;
using Kanoq.Domain;
using Microsoft.Ajax.Utilities;
using Newtonsoft.Json;
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
        public IHttpActionResult Get()
        {
          var clients = ClientManager.GetClients();
          return Ok(clients);                    
        }
        [HttpPost]
        public IHttpActionResult Get([FromUri] Guid id)
        {
            var client = ClientManager.GetClient(id);
            return Ok(client);
        }
    }
}