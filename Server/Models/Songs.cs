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
        [Column("name_artist")]
        [StringLength(255)]
        public string NameArtist { get; set; }
        [Column("name_album")]
        [StringLength(255)]
        public string NameAlbum { get; set; }
    }
}
