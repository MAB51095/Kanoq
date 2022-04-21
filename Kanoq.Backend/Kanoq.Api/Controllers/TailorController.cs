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
    [RoutePrefix("Tailor")]
    public class TailorController : ApiController
    {
        // GET: Tailor
        private readonly ITailorManager TailorManager;
        public TailorController(ITailorManager tailorManager)
        {
            TailorManager = tailorManager;
        }
        [Route("get")]
        [HttpGet]
        public IHttpActionResult Get()
        {
          var tailors = TailorManager.Get();
          return Ok(tailors);                    
        }

        [Route("get/{id}")]
        [HttpGet]
        public IHttpActionResult Get(Guid id)
        {
            var tailor = TailorManager.Get(id);
            return Ok(tailor);
        }
                
        [Route("insert")]
        [HttpPost]
        public IHttpActionResult Insert([FromBody] Tailor tailor)
        {
            try
            {
                tailor = TailorManager.Insert(tailor);
                return Ok(tailor);
            }
            catch(Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
            
        }

        [Route("update")]
        [HttpPost]
        public IHttpActionResult Update([FromBody] Tailor tailor)
        {
            try
            {
                tailor = TailorManager.Update(tailor);
                return Ok(tailor);
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
                TailorManager.Delete(id);
                return Content(HttpStatusCode.OK, "Deleted");
            }
            catch(Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}