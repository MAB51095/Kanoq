using Kanoq.BLL;
using Kanoq.BLL.Interfaces;
using Kanoq.Domain;
using Microsoft.Ajax.Utilities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;


namespace Kanoq.Api.Controllers
{
    [RoutePrefix("Client")]
    public class ClientController : ApiController
    {
        // GET: Client
        private readonly IClientManager ClientManager;
        public ClientController(IClientManager clientManager)
        {
            ClientManager = clientManager;
        }
        [Route("get")]
        [HttpGet]
        public IHttpActionResult Get()
        {
          var clients = ClientManager.Get();
          return Ok(clients);                    
        }

        [Route("get/{id}")]
        [HttpGet]
        public IHttpActionResult Get(Guid id)
        {
            var client = ClientManager.Get(id);
            return Ok(client);
        }
                
        [Route("insert")]
        [HttpPost]
        public IHttpActionResult Insert([FromBody] Client client)
        {
            try
            {
                client = ClientManager.Insert(client);
                return Ok(client);
            }
            catch(Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
            
        }

        [Route("update")]
        [HttpPost]
        public IHttpActionResult Update([FromBody] Client client)
        {
            try
            {
                client = ClientManager.Update(client);
                return Ok(client);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }

        [Route("delete/{id}")]
        [HttpPost]
        public IHttpActionResult Delete(Guid id)
        {
            try
            {
                ClientManager.Delete(id);
                return Content(HttpStatusCode.OK, "Deleted");
            }
            catch(Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}