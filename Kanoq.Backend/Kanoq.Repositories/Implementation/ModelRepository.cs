using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Kanoq.Repositories.Generic;
using Kanoq.Repositories.Interfaces;
using Kanoq.DAL;

namespace Kanoq.Repositories.Implementations
{
    class ModelRepository :  Repository<Model>, IModelRepository
    {
        public ModelRepository(KanoqDbContext kanoqDBContext) : base(kanoqDBContext)
        {

        }
    }
}
