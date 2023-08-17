namespace FootGrids.Models
{
    public class GridPista
    {
        public int GridId { get; set; }
        public int PistaId { get; set; }
        public int NumPista { get; set; }
        public Grid Grids { get; set; }
        public Pista Pistas { get; set; }
    }
}
