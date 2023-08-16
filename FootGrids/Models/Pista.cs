using System.ComponentModel.DataAnnotations;

namespace FootGrids.Models
{
    public class Pista
    {
        public int Id { get; set; }
        [Required]
        [StringLength(120)]
        public string? Nombre { get; set; }
        public List<GridPista>? GridsPistas { get; set; }
    }
}
