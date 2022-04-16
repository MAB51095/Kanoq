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
    class ClientRepository :  Repository<Client>, IClientRepository
    {
        public ClientRepository(KanoqDbContext kanoqDBContext) : base(kanoqDBContext)
        {

        }
    }
}
