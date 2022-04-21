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
    public class TailorManager : ITailorManager
    {
        private readonly IUnitOfWork UnitOfWork;
        public TailorManager (IUnitOfWork unitOfWork)
        {
            UnitOfWork = unitOfWork;            
        }
        
        public IList<Domain.Tailor> Get()
        {
            var tailors = UnitOfWork.Tailors.GetAll().ToList();
            return Mapper.Map<List<Tailor>, List<Domain.Tailor>>(tailors);
        }
        public Domain.Tailor Get(Guid id)
        {
            var tailor = UnitOfWork.Tailors.SingleOrDefault(c=>c.Id==id);           
            return Mapper.Map<Tailor, Domain.Tailor>(tailor);
        }

        public Domain.Tailor Insert(Domain.Tailor tailor)
        {
            if(tailor == null)
            {
                throw new Exception("Input Empty");
            }

            if(!(tailor.Id == Guid.Empty || tailor.Id == null))
            {
                throw new Exception("Input should not contain Id");
            }
            
            tailor.Id = Guid.NewGuid();
            
            UnitOfWork.Tailors.Add(Mapper.Map<Domain.Tailor, Tailor>(tailor));
            
            UnitOfWork.Complete();
            
            return tailor;
        }
        public Domain.Tailor Update(Domain.Tailor tailor)
        {
            if (tailor.Id == Guid.Empty || tailor.Id == null)
            {
                throw new Exception("Input should contain Id");
            }

            var updatedTailor = UnitOfWork.Tailors.SingleOrDefault(c => c.Id == tailor.Id);

            if (updatedTailor == null)
                throw new Exception("Entity Not Found");

            updatedTailor.Name = tailor.Name ?? updatedTailor.Name;
            updatedTailor.PhoneNumber = tailor.PhoneNumber ?? updatedTailor.PhoneNumber;
            updatedTailor.Email = tailor.Email ?? updatedTailor.Email;

            UnitOfWork.Complete();

            return Mapper.Map<Tailor,Domain.Tailor>(updatedTailor);
            
        }
        
        public void  Delete(Guid id)
        {
            var tailor = UnitOfWork.Tailors.SingleOrDefault(c => c.Id == id);

            if (tailor == null)
                throw new Exception("Entity Not Found");

            UnitOfWork.Tailors.Remove(tailor);
            UnitOfWork.Complete();
        }
    }
}
