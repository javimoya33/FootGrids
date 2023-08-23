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

            List<JugadorDTO> jugadoresDTOs = new List<JugadorDTO>();

            using (HttpClient client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("X-RapidAPI-Key", "60036f70d2msh81e7e7b91cb4d7fp111932jsn15e41e4ba0e1");
                client.DefaultRequestHeaders.Add("X-RapidAPI-Host", "api-football-v1.p.rapidapi.com");

                string url = "https://api-football-v1.p.rapidapi.com/v3/players";

                var queryString = new System.Collections.Specialized.NameValueCollection();
                queryString["league"] = "140";
                queryString["search"] = "Fauber";

                string fullUrl = url + ToQueryString(queryString);

                HttpResponseMessage response = await client.GetAsync(fullUrl);

                if (response.IsSuccessStatusCode)
                {
                    string responseBody = await response.Content.ReadAsStringAsync();
                    dynamic jugadoresData = JsonConvert.DeserializeObject<dynamic>(responseBody);

                    foreach (var jugadorData in jugadoresData["response"])
                    {
                        JugadorDTO jugadorDTO = new JugadorDTO
                        {
                            Nombre = jugadorData["player"]["name"]
                        };

                        jugadoresDTOs.Add(jugadorDTO);
                    }
                }
                else
                {
                    Console.WriteLine("Error: " + response.StatusCode);
                }
            }

            var pistasDTOs = new PistasDTO
            {
                Pistas = pistaDTOs,
                Jugadores = jugadoresDTOs
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
    }
}