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
    public class ModelManager : IModelManager
    {
        private readonly IUnitOfWork UnitOfWork;
        public ModelManager (IUnitOfWork unitOfWork)
        {
            UnitOfWork = unitOfWork;            
        }
        
        public IList<Domain.Model> Get()
        {
            var models = UnitOfWork.Models.GetAll().ToList();
            return Mapper.Map<List<Model>, List<Domain.Model>>(models);
        }
        public Domain.Model Get(Guid id)
        {
            var model = UnitOfWork.Models.SingleOrDefault(c=>c.Id==id);           
            return Mapper.Map<Model, Domain.Model>(model);
        }

        public Domain.Model Insert(Domain.Model model)
        {
            if(model == null)
            {
                throw new Exception("Input Empty");
            }

            if(!(model.Id == Guid.Empty || model.Id == null))
            {
                throw new Exception("Input should not contain Id");
            }
            
            model.Id = Guid.NewGuid();
            
            UnitOfWork.Models.Add(Mapper.Map<Domain.Model, Model>(model));
            
            UnitOfWork.Complete();
            
            return model;
        }
        public Domain.Model Update(Domain.Model model)
        {
            if (model.Id == Guid.Empty || model.Id == null)
            {
                throw new Exception("Input should contain Id");
            }

            var updatedModel = UnitOfWork.Models.SingleOrDefault(c => c.Id == model.Id);

            if (updatedModel == null)
                throw new Exception("Entity Not Found");

            updatedModel.Name = model.Name ?? updatedModel.Name;
           
            UnitOfWork.Complete();

            return Mapper.Map<Model,Domain.Model>(updatedModel);            
        }
        
        public void  Delete(Guid id)
        {
            var model = UnitOfWork.Models.SingleOrDefault(c => c.Id == id);

            if (model == null)
                throw new Exception("Entity Not Found");

            UnitOfWork.Models.Remove(model);
            UnitOfWork.Complete();
        }
    }
}
