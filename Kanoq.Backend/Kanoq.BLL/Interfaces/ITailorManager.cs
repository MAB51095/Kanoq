using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Kanoq.Domain;

namespace Kanoq.BLL.Interfaces
{
    public interface ITailorManager
    {
        IList<Tailor> Get();
        Tailor Get(Guid id);
        Tailor Insert(Tailor tailor);
        Tailor Update(Tailor tailor);
        void Delete(Guid id);
    }
}
