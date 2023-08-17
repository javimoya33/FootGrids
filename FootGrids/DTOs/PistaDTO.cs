﻿using System.ComponentModel.DataAnnotations;

namespace FootGrids.DTOs
{
    public class PistaDTO
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public int NumPista { get; set; }
        public string Tipo { get; set; }
        public string Link { get; set; }
    }
}
