// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

var yearsToQuery = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];
var delayBetweenRequests = 2000; 

$(document).ready(function () {

    realizarSolicitud(0);


    /* Mostrar div de búsqueda de jugador cuando se clicka en una casilla oculta */
    $('.celda-grid-jug-ocultos').click(function (event) {

        $('#div-busq-jug').append(
            '<div class="d-flex">' +
                '<div class="div-close" onclick="cerrarVentanaBusq()">' + '<img src="../img/close.png" />' + '</div>' + 
                '<div>' + 
                    '<img src="../img/defaultavatar.webp" id="img-jug-seleccionado" style="width: 200px" />' + 
                '</div>' + 
                '<div id="div-jug-info-seleccionado" class="fuentePrincipal colorFuenteTerciaria d-grid" style="place-content: center;">' + 
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

function realizarSolicitud(index) {
    if (index < yearsToQuery.length) {
        var year = yearsToQuery[index];
        var queryString = {
            team: 529,
            league: 140,
            season: year
        };

        $.ajax({
            url: "https://api-football-v1.p.rapidapi.com/v3/players",
            type: "GET",
            dataType: "json",
            headers: {
                "X-RapidAPI-Key": "api_key",
                "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
            },
            data: queryString,
            success: function (data) {
                // Procesar los datos aquí

                data.response.forEach(function (jugadorData) {
                    console.log(jugadorData.player.name);
                });

                // Llamar a la siguiente solicitud después de un retraso
                setTimeout(function () {
                    realizarSolicitud(index + 1);
                }, delayBetweenRequests);
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error("Error:", textStatus, errorThrown);

                // Llamar a la siguiente solicitud después de un retraso
                setTimeout(function () {
                    realizarSolicitud(index + 1);
                }, delayBetweenRequests);
            }
        });
    }
}


function cerrarVentanaBusq() {
    $('#div-busq-jug').hide(200);
    $('#div-busq-jug').empty();
    $('#div-overlay-juego').hide();
}

function mouseEnterDivResultBusq(elemento) {
    var jugadorNombre = $(elemento).find('.div-info-jugador').data('jugador-nombre');
    var jugadorImg = $(elemento).find('.div-info-jugador').data('jugador-img');
    var jugadorEdad = $(elemento).find('.div-info-jugador').data('jugador-edad');
    var jugadorNacionalidad = $(elemento).find('.div-info-jugador').data('jugador-nacionalidad');

    $('#img-jug-seleccionado').attr('src', jugadorImg);

    $('#div-jug-info-seleccionado').empty();
    $('#div-jug-info-seleccionado').append(
        '<div>Nombre: ' + jugadorNombre + '</div>' +
        '<div>Edad: ' + jugadorEdad + '</div>' +
        '<div>Nacionalidad: ' + jugadorNacionalidad + '</div>');
}

function escribirBuscadorJugador() {

    $('#div-result-busq').empty();

    var busqueda = $('#input-busq-jug').val();

    setTimeout(function(){

        if ($('#input-busq-jug').val() == busqueda) {

            var urlKeys = "/Home/GetApiKeys";
            //$('#div-result-busq').empty();

            $.ajax({
                url: urlKeys,
                type: "GET",
                dataType: "json",
                success: function (data) {

                    var url = "https://api-football-v1.p.rapidapi.com/v3/players";
                    var apiKey = data.rapidAPIKey;
                    var apiHost = data.rapidAPIHost;
                    var ligasToQuery = ["140", "39", "135", "78", "61"];
                    var queryString = {
                        search: busqueda
                    };

                    // Objeto para almacenar todos los datos procesados por liga
                    var allDatosProcesados = {};
                    var ligasBuscadas = 0;
                    var iteracciones = 0;
                    var maxIteracciones = 10;

                    ligasToQuery.forEach(function (liga) {
                        queryString.league = liga;

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

                                if (data && data.response) {

                                    var datosProcesados = [];

                                    data.response.forEach(function (jugadorData) {
                                        if (iteracciones < maxIteracciones) {

                                            datosProcesados.push({
                                                nombre: jugadorData.player.name,
                                                imagen: jugadorData.player.photo,
                                                edad: jugadorData.player.age,
                                                nacionalidad: jugadorData.player.nationality
                                            });

                                            iteracciones++;
                                        }
                                        else {
                                            return false;
                                        }
                                    });

                                    datosProcesados.forEach(function (jugador) {

                                        if (iteracciones < maxIteracciones) {
                                            $('#div-result-busq').append(
                                                '<div onmouseenter="mouseEnterDivResultBusq(this)" class="div-result-busq fuentePrincipal">' +
                                                '<span class="fuentePrincipal">' + jugador.nombre + '</span>' +
                                                '<div class="div-info-jugador" data-jugador-nombre="' + jugador.nombre + '" data-jugador-img="' + jugador.imagen + '" data-jugador-edad="' + jugador.edad + '" data-jugador-nacionalidad="' + jugador.nacionalidad + '"></div>' +
                                                '</div>');
                                        }
                                    });
                                }

                                ligasBuscadas++;
                            },
                            error: function (xhr, textStatus, errorThrown) {
                                console.error("Error:", textStatus, errorThrown);
                            }

                        });
                    });
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.error("Error:", textStatus, errorThrown);
                }
            });
        }
    }, 2000);
}