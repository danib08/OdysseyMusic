using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    [Table("Users", Schema = "OdysseyMusicDB")]
    public partial class Users
    {
        [Key]
        [Column("id_song")]
        public int IdUser { get; set; }

        [Column("email_user")]
        [StringLength(255)]
        public string EmailUser { get; set; }
    }
}
