namespace FootGrids.Models
{
    public class Grid
    {
        public int Id { get; set; }
        public DateTime Fecha { get; set; }
        public List<GridPista>? GridsPistas { get; set; }
    }
}
