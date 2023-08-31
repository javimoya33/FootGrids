namespace FootGrids.Models
{
    public class Solucion
    {
        public int Id { get; set; }
        public int IdAPI { get; set; }
        public string TablaAPI { get; set; }
        public int Valor { get; set; }
        public Pista Pistas { get; set; }
    }
}
