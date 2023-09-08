namespace FootGrids.Models
{
    public class Solucion
    {
        public int Id { get; set; }
        public int IdAPI { get; set; }
        public string TablaAPI { get; set; }
        public int Valor { get; set; }
        public int NumSolucion { get; set; }
        public Grid Grid { get; set; }
    }
}
