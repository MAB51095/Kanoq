using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kanoq.DAL.Interfaces
{
    public interface IKanoqDbContext : IDisposable
    {
        DbSet<Client> Clients { get; set; }
        DbSet<Model> Models { get; set; }
        DbSet<Tailor> Tailors { get; set; }
        int SaveChanges();
    }
}
