using System;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using Chromat.Models;
namespace chromat.DAL
{
    public class ChromatContext : DbContext
    {
        public ChromatContext() : base("ChromatContext")
        {
        }


        public DbSet<Zamowienie> Courses { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}
