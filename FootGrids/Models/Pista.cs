using System.ComponentModel.DataAnnotations;

namespace FootGrids.Models
{
    public class Pista
    {
        public int Id { get; set; }
        [Required]
        [StringLength(120)]
        public string Nombre { get; set; }
        public string Tipo { get; set; }
        public string Link { get; set; }
        public List<GridPista> GridsPistas { get; set; }
    }
}
