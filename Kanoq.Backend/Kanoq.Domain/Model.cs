using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kanoq.Domain
{
    public class Model
    {
        public Guid Id { get; set; }
        public string Name { get; set; }    
    }
}
