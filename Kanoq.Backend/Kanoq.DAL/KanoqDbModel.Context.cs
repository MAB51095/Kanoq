﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Kanoq.DAL
{
    using Kanoq.DAL.Interfaces;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class KanoqDbContext : DbContext, IKanoqDbContext
    {
        public KanoqDbContext()
            : base("name=KanoqDbContext")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Client> Clients { get; set; }
        public virtual DbSet<Model> Models { get; set; }
        public virtual DbSet<Tailor> Tailors { get; set; }
    }
}
