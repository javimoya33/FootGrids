using AutoMapper;
using FootGrids.DTOs;
using FootGrids.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Diagnostics;
using System.Net.Http.Json;
using System.Text.Json.Serialization;

namespace FootGrids.Controllers
{
    [ApiController]
    [Route("FootGrids")]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IConfiguration _configuration;

        public HomeController(ILogger<HomeController> logger, ApplicationDbContext context, IMapper mapper, IConfiguration configuration)
        {
            _logger = logger;
            this.context = context;
            this.mapper = mapper;
            _configuration = configuration;
        }

        public async Task<ActionResult> FootGrids()
        {
            var pistas = await context.Pistas
                .Where(p => p.GridsPistas.Any(gp => gp.GridId == 2))
                .Include(x => x.GridsPistas)
                .ToListAsync();

            var pistaDTOs = pistas.Select(pista => new PistaDTO
            {
                Nombre = pista.Nombre,
                NumPista = pista.GridsPistas.FirstOrDefault()?.NumPista ?? 0,
                Tipo = pista.Tipo,
                Link = pista.Link
            }).ToList();

            ViewBag.RapidAPIKey = _configuration["ApiKeys:RapidAPIKey"];
            ViewBag.RapidAPIHost = _configuration["ApiKeys:RapidAPIHost"];

            var pistasDTOs = new PistasDTO
            {
                Pistas = pistaDTOs
            };

            return View(pistasDTOs);
        }

        static string ToQueryString(System.Collections.Specialized.NameValueCollection nvc)
        {
            var array = (
                from key in nvc.AllKeys
                from value in nvc.GetValues(key)
                select string.Format("{0}={1}", Uri.EscapeDataString(key), Uri.EscapeDataString(value))
            ).ToArray();
            return "?" + string.Join("&", array);
        }

        [HttpGet("/Home/GetApiKeys")]
        public IActionResult GetApiKeys()
        {
            var rapidAPIKey = _configuration["ApiKeys:RapidAPIKey"];
            var rapidAPIHost = _configuration["ApiKeys:RapidAPIHost"];

            var apiKeys = new { RapidAPIKey = rapidAPIKey, RapidAPIHost = rapidAPIHost };

            return Json(apiKeys);
        }

        [HttpGet("/Home/GetSolucionesCasilla")]
        public async Task<IActionResult> GetSolucionesCasilla(int numeroSolucion, int idJugador)
        {
            var soluciones = await context.Soluciones
                .Where(sl => sl.NumSolucion == numeroSolucion && sl.Grid.Id == 2)
                .Join<Solucion, Grid, int, dynamic>(context.Grids, sl => sl.Grid.Id, gr => gr.Id,
                    (sl, gr) => new
                    {
                        Solucion = sl,
                        Grid = gr
                    })
                .ToListAsync();

            bool jugadorEncontrado = false;
            int handicap = 1;

            foreach (var solucion in soluciones)
            {
                if (solucion.Solucion.IdAPI == idJugador)
                {
                    jugadorEncontrado = true;
                    handicap = solucion.Solucion.Handicap;
                }
            }

            var resultado = new
            {
                JugadorEncontrado = jugadorEncontrado,
                Handicap = handicap
            };

            return Json(resultado);
        }
    }
}