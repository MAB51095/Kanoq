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
    class TailorRepository :  Repository<Tailor>, ITailorRepository
    {
        public TailorRepository(KanoqDbContext kanoqDBContext) : base(kanoqDBContext)
        {

        }
    }
}
