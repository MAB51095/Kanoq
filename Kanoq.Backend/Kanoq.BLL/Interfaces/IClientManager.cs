using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Kanoq.DAL;
using Kanoq.Repositories;

namespace Kanoq.BLL.Interfaces
{
    public interface IClientManager
    {
        IList<Client> GetClients();
    }
}
