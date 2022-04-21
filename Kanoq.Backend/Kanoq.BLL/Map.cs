using AutoMapper;
using Dal=Kanoq.DAL;
using Domain = Kanoq.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kanoq.BLL
{
    public static class Map
    {
        public static void Initialize()
        {
            Mapper.Configuration.CreateMap<Dal.Client, Domain.Client>();
            Mapper.Configuration.CreateMap<Dal.Tailor, Domain.Tailor>();
            Mapper.Configuration.CreateMap<Dal.Model, Domain.Model>();

            Mapper.Configuration.CreateMap<Domain.Client, Dal.Client>();
            Mapper.Configuration.CreateMap<Domain.Tailor, Dal.Tailor>();
            Mapper.Configuration.CreateMap<Domain.Model, Dal.Model>();
        }
    }
}
