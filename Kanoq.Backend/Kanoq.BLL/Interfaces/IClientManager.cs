using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Kanoq.Domain;

namespace Kanoq.BLL.Interfaces
{
    public interface IClientManager
    {
        IList<Client> Get();
        Client Get(Guid id);
        Client Insert(Client client);
        Client Update(Client client);
        void Delete(Guid id);
    }
}
