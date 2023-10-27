using AutoMapper;
using FootGrids.DTOs;
using FootGrids.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FootGrids.Controllers
{
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

        // Vista principal del juego donde se cargan las pistas de hoy si no ha seleccionado previamente una fecha para el grid
        // que se quiere mostrar
        public async Task<IActionResult> FootGrids(DateTime? fechaElegida = null)
        {
            DateTime fechaHoy = DateTime.Now.Date;

            if (fechaElegida == null)
            {
                fechaElegida = fechaHoy;
            }

            if (fechaElegida > fechaHoy)
            {
                fechaElegida = fechaHoy;
            }

            var idGridHoy = await context.Grids
                .Where(gd => gd.Fecha == fechaElegida)
                .FirstOrDefaultAsync();

            var gridPistas = await context.GridsPista
                .Where(gp => gp.GridId == gp.Grids.Id && gp.Grids.Fecha == fechaElegida)
                .Include(gp => gp.Pistas)
                .OrderBy(gp => gp.NumPista)
                .ToListAsync();

            var gridPistaDTOs = gridPistas.Select(gridPistas => new GridPistaDTO
            {
                Nombre = gridPistas.Pistas.Nombre,
                NumPista = gridPistas.NumPista,
                Tipo = gridPistas.Pistas.Tipo,
                Link = gridPistas.Pistas.Link
            }).ToList();

            ViewBag.RapidAPIKey = _configuration["ApiKeys:RapidAPIKey"];
            ViewBag.RapidAPIHost = _configuration["ApiKeys:RapidAPIHost"];

            var gridsPasados = await context.Grids
                .Where(g => g.Fecha <= fechaHoy)
                .OrderBy(g => g.Fecha)
                .ToListAsync();

            var gridPasadosDTOs = gridsPasados.Select(grid => new GridDTO
            {
                Id = grid.Id,
                Fecha = grid.Fecha.Date
            }).ToList();

            var gridPistasDTO = new GridsPistasDTO
            {
                GridsPistas = gridPistaDTOs,
                Grids = gridPasadosDTOs,
                GridId = idGridHoy.Id
            };

            ViewBag.FechaSeleccionada = fechaElegida;

            return View(gridPistasDTO);
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

        // Acción que devuelve la key y el Host de la API usada para buscar a los jugadores
        [HttpGet("/Home/GetApiKeys")]
        public IActionResult GetApiKeys()
        {
            var rapidAPIKey = _configuration["ApiKeys:RapidAPIKey"];
            var rapidAPIHost = _configuration["ApiKeys:RapidAPIHost"];

            var apiKeys = new { RapidAPIKey = rapidAPIKey, RapidAPIHost = rapidAPIHost };

            return Json(apiKeys);
        }

        // Acción que devuelve por consola las soluciones del juego cuando preparo la partida
        // ELIMINAR CUANDO VAYA A PUBLICAR EL JUEGO
        [HttpGet("/Home/GetSolucionesCasilla")]
        public async Task<IActionResult> GetSolucionesCasilla(int numeroSolucion, int idJugador, DateTime fechaSeleccionada)
        {
            var soluciones = await context.Soluciones
                .Where(sl => sl.NumSolucion == numeroSolucion && sl.Grid.Fecha.Date == fechaSeleccionada)
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