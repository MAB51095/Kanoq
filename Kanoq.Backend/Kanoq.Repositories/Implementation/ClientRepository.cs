using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Kanoq.Repositories.Common;
using Kanoq.Repositories.Interfaces;

namespace Kanoq.Repositories.Implementations
{
    class ClientRepository :  Repository<Client>, IClientRepository
    {
        public ClientRepository(KanoqDBContext kanoqDBContext) : base(kanoqDBContext)
        {

        }
    }
}
