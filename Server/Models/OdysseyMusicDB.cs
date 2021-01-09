using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Server.Models
{
    public partial class OdysseyMusicDB : DbContext
    {
        public OdysseyMusicDB()
        {
        }

        public OdysseyMusicDB(DbContextOptions<OdysseyMusicDB> options)
            : base(options)
        {
        }

        public virtual DbSet<Songs> Songs { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySQL("server=localhost;user=root;password=password;port=3306;database=OdysseyMusicDB");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
          
            modelBuilder.Entity<Songs>(entity =>
            {
                entity.HasKey(e => e.IdSong)
                    .HasName("PRIMARY");
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.HasKey(e => e.IdUser)
                    .HasName("PRIMARY");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
