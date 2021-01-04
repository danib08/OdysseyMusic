using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    [Table("Songs", Schema = "OdysseyMusicDB")]
    public partial class Songs
    {
        [Key]
        [Column("id_song")]
        public int IdSong { get; set; }

        [Column("name_song")]
        [StringLength(255)]
        public string NameSong { get; set; }
        [Column("lyrics")]
        public string Lyrics { get; set; }
        [Column("id_artist")]
        public int? IdArtist { get; set; }

        [ForeignKey(nameof(IdArtist))]
        [InverseProperty(nameof(Artists.Songs))]
        public virtual Artists IdArtistNavigation { get; set; }
    }
}
