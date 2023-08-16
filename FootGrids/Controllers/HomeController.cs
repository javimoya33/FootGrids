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
            var pistas = await context.Pistas.ToListAsync();
            var pistaDTOs = pistas.Select(pista => mapper.Map<PistaDTO>(pista)).ToList();

            var pistasDTOs = new PistasDTO
            {
                Pistas = pistaDTOs
            };

            return View(pistasDTOs);
        }
    }
}