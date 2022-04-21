using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Kanoq.Domain;

namespace Kanoq.BLL.Interfaces
{
    public interface IModelManager
    {
        IList<Model> Get();
        Model Get(Guid id);
        Model Insert(Model model);
        Model Update(Model model);
        void Delete(Guid id);
    }
}
