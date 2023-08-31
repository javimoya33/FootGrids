using AutoMapper;
using FootGrids.DTOs;
using FootGrids.Models;

namespace FootGrids.Helpers
{
    public class AutoMapperProfile: Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Grid, GridDTO>();

            CreateMap<Pista, PistaDTO>();

            CreateMap<Solucion, SolucionDTO>();
        }
    }
}
