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
    [RoutePrefix("Model")]
    public class ModelController : ApiController
    {
        // GET: Model
        private readonly IModelManager ModelManager;
        public ModelController(IModelManager modelManager)
        {
            ModelManager = modelManager;
        }
        [Route("get")]
        [HttpGet]
        public IHttpActionResult Get()
        {
          var models = ModelManager.Get();
          return Ok(models);                    
        }

        [Route("get/{id}")]
        [HttpGet]
        public IHttpActionResult Get(Guid id)
        {
            var model = ModelManager.Get(id);
            return Ok(model);
        }
                
        [Route("insert")]
        [HttpPost]
        public IHttpActionResult Insert([FromBody] Model model)
        {
            try
            {
                model = ModelManager.Insert(model);
                return Ok(model);
            }
            catch(Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
            
        }

        [Route("update")]
        [HttpPost]
        public IHttpActionResult Update([FromBody] Model model)
        {
            try
            {
                model = ModelManager.Update(model);
                return Ok(model);
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
                ModelManager.Delete(id);
                return Content(HttpStatusCode.OK, "Deleted");
            }
            catch(Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}