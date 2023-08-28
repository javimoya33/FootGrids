// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

$(document).ready(function () {

    /* Mostrar div de búsqueda de jugador cuando se clicka en una casilla oculta */
    $('.celda-grid-jug-ocultos').click(function (event) {

        $('#div-busq-jug').append('<div class="d-flex">' + 
                                    '<div>' + 
                                        '<img src="../img/defaultavatar.webp" style="width: 200px" />' + 
                                    '</div>' + 
                                    '<div class="fuentePrincipal colorFuenteTerciaria d-grid" style="place-content: center;">' + 
                                        '<img src="../img/campo_busq_jug.png" style="width: 100%" />' + 
                                    '</div>' + 
                                  '</div>' + 
                                  '<div>' + 
                                    '<input type="text" id="input-busq-jug" placeholder="Introduzca el nombre del jugador oculto..." oninput="escribirBuscadorJugador()" value="" class="input-busq-jug rounded fuentePrincipal colorFuenteTerciaria" style="width: 100%" />' + 
                                  '<div id="div-result-busq"></div>' + 
                                  '</div>');

        $('#div-busq-jug').show(200);
        $('#div-overlay-juego').show();
        $('#input-busq-jug').focus();
        event.stopPropagation();
    });

    $('#input-busq-jug').click(function (event) {
        event.stopPropagation();
    });

    $('#div-busq-jug').click(function (event) {
        event.stopPropagation();
    });

    /* Ocultar div de búsqueda de jugador cuando se clicka fuera de su contenedor */
    $(document).click(function () {
        $('#div-busq-jug').hide(200);
        $('#div-busq-jug').empty();
        $('#div-overlay-juego').hide();
    });
});

function escribirBuscadorJugador() {

    $('#div-result-busq').empty();
    console.log("Entra1");

    var busqueda = $('#input-busq-jug').val();

    setTimeout(function(){

        console.log("Entra2");

        if ($('#input-busq-jug').val() == busqueda) {

            var apiKeysElement = $("#api-keys");

            var url = "https://api-football-v1.p.rapidapi.com/v3/players";
            var apiKey = apiKeysElement.data("rapid-api-key");
            var apiHost = apiKeysElement.data("rapid-api-host");
            var queryString = {
                league: "140",
                search: busqueda
            }

            console.log("Entra3 " + apiKey + " ***** " + apiHost);

            $.ajax({
                url: url,
                type: "GET",
                dataType: "json",
                headers: {
                    "X-RapidAPI-Key": apiKey,
                    "X-RapidAPI-Host": apiHost
                },
                data: queryString,
                success: function (data) {
                    var jugadoresDTOs = [];

                    console.log("Entra4");

                    if (data && data.response) {
                        console.log("Entra5");
                        data.response.forEach(function (jugadorData) {

                            $('#div-result-busq').append('<div class="div-result-busq fuentePrincipal">' + jugadorData.player.name + '</div>');

                            console.log("Entra6 " + jugadorData.player.name);

                            var jugadorDTO = {
                                Nombre: jugadorData.player.name
                            };

                            jugadoresDTOs.push(jugadorDTO);
                        });
                    }
                },
                error: function(xhr, textStatus, errorThrown) {
                    console.error("Error:", textStatus, errorThrown);
                }

            })

            fetch("https://api-football-v1.p.rapidapi.com/v3/players", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": apiHost,
                    "x-rapidapi-key": apiKey
                }
            })
                .then(response => {


                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, 2000);
}