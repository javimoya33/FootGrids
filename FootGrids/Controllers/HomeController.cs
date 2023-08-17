using AutoMapper;
using FootGrids.DTOs;
using FootGrids.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace FootGrids.Controllers
{
    [ApiController]
    [Route("FootGrids")]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public HomeController(ILogger<HomeController> logger, ApplicationDbContext context, IMapper mapper)
        {
            _logger = logger;
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<ActionResult> FootGrids()
        {
            var pistas = await context.Pistas
                .Include(x => x.GridsPistas)
                .ToListAsync();

            var pistaDTOs = pistas.Select(pista => new PistaDTO
            {
                Nombre = pista.Nombre,
                NumPista = pista.GridsPistas.FirstOrDefault()?.NumPista ?? 0,
                Tipo = pista.Tipo,
                Link = pista.Link
            }).ToList();

            var pistasDTOs = new PistasDTO
            {
                Pistas = pistaDTOs
            };

            return View(pistasDTOs);
        }
    }
}