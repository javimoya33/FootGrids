using System.ComponentModel.DataAnnotations;

namespace FootGrids.DTOs
{
    public class SolucionCreacionDTO
    {
        [Required]
        public int IdAPI { get; set; }

        public string TablaAPI { get; set; }

        [Required]
        public int Handicap { get; set; }

        [Required]
        public int NumSolucion { get; set; }
    }
}
