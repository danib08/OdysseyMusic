using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    [Table("Artists", Schema = "OdysseyMusicDB")]
    public partial class Artists
    {
        public Artists()
        {
            Songs = new HashSet<Songs>();
        }

        [Key]
        [Column("id_artist")]
        public int IdArtist { get; set; }
        [Column("name_artist")]
        [StringLength(255)]
        public string NameArtist { get; set; }

        [InverseProperty("IdArtistNavigation")]
        public virtual ICollection<Songs> Songs { get; set; }
    }
}
