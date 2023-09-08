// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

// Array de los años de los datos que se buscarán en la API
var yearsToQuery = [/*2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, */2021, 2022, 2023];
var delayBetweenRequests = 2000; 
var jugadoresAcertados = 0;
var intervalId;

var seconds = 0;
var minutes = 0;

$(document).ready(function () {

    // Si en las cookies del navegador hay fecha de la última visita al juego, y la fecha de esa última visitada es igual a la de hoy
    // entonces se recuperará el tiempo transcurrido en la partida y se mostrará en el div del cronómetro
    const ultVisita = obtenerFechaUltVisita();

    if (ultVisita !== null) {

        const fechaHoy = fechaFormateada();

        if (fechaHoy == ultVisita) {

            const tiempoGuardado = obtenerTiempoEnCookie();

            if (tiempoGuardado !== null) {

                $('#div-cronometro').text(tiempoGuardado);

                const arrTiempo = tiempoGuardado.split(":");

                minutes = parseInt(arrTiempo[0]);
                seconds = parseInt(arrTiempo[1]);
            }
        }
    }

    // Guardamos la fecha de hoy en las cookies del navegador como fecha de visita al juego
    guardarUltVisitaEnCookie();

    intervalId = setInterval(updateCrono, 1000);

    // ***** NO BORRAR - SE UTILIZA PARA SACAR LOS DATOS DE LOS SOLUCIONES DE CADA PARTIDA
    /*realizarSolicitud(0, 1);

    setTimeout(function () {
        realizarSolicitud(0, 2);
    }, 20000);

    setTimeout(function () {
        realizarSolicitud(0, 3);
    }, 40000);*/

    // Mostrar div de búsqueda de jugador cuando se clicka en una casilla oculta 
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
            '<input type="hidden" id ="input-busq-id-jug" value="" />' + 
            '<input type="hidden" id="input-casilla" value="" />' + 
            '<div id="div-result-busq"></div>' + 
            '</div>');

        // Obtener el número de la celda que se ha pulsado para buscar el jugador oculto
        var claseCelda = $(this).attr('class');
        var match = claseCelda.match(/fg-casilla-(\d+)/)
        if (match) {
            var numeroCasilla = match[1];
            $('#input-casilla').val(numeroCasilla);
        }

        // Mostrar el div de búsqueda, oscurecer el resto del juego y darle foco
        $('#div-busq-jug').show(200);
        $('#div-overlay-juego').show();
        $('#input-busq-jug').focus();
        event.stopPropagation();
    });

    // Funciones utilizadas para que el jquery no llegue a la función que oculta el div de búsqueda si hemos clickado sobre el div de búsqueda
    $('#input-busq-jug').click(function (event) {
        event.stopPropagation();
    });

    $('#div-busq-jug').click(function (event) {
        event.stopPropagation();
    });

    // Ocultar div de búsqueda de jugador cuando se clicka fuera de su contenedor 
    $(document).click(function () {
        $('#div-busq-jug').hide(200);
        $('#div-busq-jug').empty();
        $('#div-overlay-juego').hide();
        $('#div-victoria').hide();
    });
});

// Obtener la fecha de hoy con el mismo formato en que se guardan en las bases de datos
function fechaFormateada() {
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Sumamos 1 porque los meses se indexan desde 0
    const día = String(fechaActual.getDate()).padStart(2, '0');
    const horas = '00';
    const minutos = '00';
    const segundos = '00';
    const milisegundos = '0000000';

    const fechaFormateada = `${año}-${mes}-${día} ${horas}:${minutos}:${segundos}.${milisegundos}`;

    return fechaFormateada;
}


// Actualizar el crono del juego a cada segundo
function updateCrono() {

    seconds++;

    if (seconds == 60) {
        seconds = 0;
        minutes++;
    }

    const formatteTime = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    $('#div-cronometro').text(formatteTime);

    guardarTiempoEnCookie();
}


// Parar el crono del juego
function stopCronometro() {
    clearInterval(intervalId);
}


// Guardar el tiempo de juego transcurrido en una cookie del navegador
function guardarTiempoEnCookie() {

    const tiempo = $('#div-cronometro').text();
    $.cookie('tiempoJuego', tiempo, { expires: 1 });
}


// Obtener la cookie que contiene el tiempo de juego transcurrido
function obtenerTiempoEnCookie() {
    return $.cookie('tiempoJuego');
}

// Guardar la fecha de la última visita al juego en una cookie del navegador 
function guardarUltVisitaEnCookie() {
    const fechaUltVisita = fechaFormateada();
    $.cookie('ultVisita', fechaUltVisita, { expires: 1 });
}

// Obtener la cookie que aloja la fecha de la última visita al juego
function obtenerFechaUltVisita() {
    return $.cookie('ultVisita');
}

// Función utilizada para buscar y obtener las soluciones a cada celda que utilizo para crear la partida
function realizarSolicitud(index, page) {
    if (index < yearsToQuery.length) {
        var year = yearsToQuery[index];
        var queryString = {
            team: 548,
            league: 140,
            season: year,
            page: page
        };

        $.ajax({
            url: "https://api-football-v1.p.rapidapi.com/v3/players",
            type: "GET",
            dataType: "json",
            headers: {
                "X-RapidAPI-Key": "60036f70d2msh81e7e7b91cb4d7fp111932jsn15e41e4ba0e1",
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
                    realizarSolicitud(index + 1, page);
                }, delayBetweenRequests);
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error("Error:", textStatus, errorThrown);

                // Llamar a la siguiente solicitud después de un retraso
                setTimeout(function () {
                    realizarSolicitud(index + 1, page);
                }, delayBetweenRequests);
            }
        });
    }
}

// Cerrar ventana de búsqueda del jugador oculto
function cerrarVentanaBusq() {
    $('#div-busq-jug').hide(200);
    $('#div-busq-jug').empty();
    $('#div-overlay-juego').hide();
}

// Cada vez que el ratón pasa por una opción de los resultados de búsqueda del jugador oculto se actualiza la previsualización del jugador elegido
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

// Cuando se clicka sobre un resultado de bñusqueda se comprueba si la solución al jugador oculto es correcta y se comprueba si el jugador 
// ya ha resuelto toda la partida
function clickDivResultBusq(idJugador, imgJugador) {

    var numeroSolucion = $('#input-casilla').val();

    $.ajax({
        type: 'GET',
        url: '/Home/GetSolucionesCasilla',
        data: { numeroSolucion: numeroSolucion, idJugador: idJugador },
        success: function (data) {

            if (data) {
                $('.fg-casilla-' + numeroSolucion).css('background', 'url("' + imgJugador + '") center top no-repeat white');

                jugadoresAcertados += 1;

                comprobarVictoria();
            }
        },
        error: function (xhr, status, error) {
            console.error('Error en la solicitud');
        }
    });

    cerrarVentanaBusq();
}

// Comprobamos si el jugador ha resuelto toda la partida y si es así se muestra un marco de victoria
function comprobarVictoria() {

    if (jugadoresAcertados >= 9) {

        stopCronometro();

        let crono = $('#div-cronometro').text();

        $('#div-overlay-juego').show();

        $('#div-victoria').append('<div class="d-flex" style="align-items: start">' + 
                                    '<div>' + 
                                        '<img src="/img/trofeo.png" class="pd-10-30" style="width: 9vw" />' + 
                                    '</div>' + 
                                    '<div>' + 
                                    '<div class="fuentePrincipal fs24 color-victoria">¡ENHORABUENA!</div>' + 
                                        '<div class="fuentePrincipal fs12">¡Sos un fenómeno! Las metes como Julián Álvarez.</div>' + 

                                        '<div class="d-flex" style="justify-content: space-around; padding: 10px 0px;">' + 
                                            '<div>' + 
                                                '<div class="fuentePrincipal fs12 text-center">Puntuación</div>' + 
                                                '<div id="divPuntuacionFinal" class="fuentePrincipal fs18 text-center color-victoria">0</div>' + 
                                            '</div>' + 

                                            '<div>' + 
                                                '<div class="fuentePrincipal fs12 text-center">Tiempo</div>' + 
                                                '<div id="divTiempoFinal" class="fuentePrincipal fs18 text-center color-victoria">' + crono + '</div>' + 
                                            '</div>' + 
                                        '</div>' + 

                                        '<div class="fuentePrincipal fs12">Compártelo con tus pibes en redes sociales, che.</div>' + 
                                        '<div class="d-flex" style="justify-content: space-around; padding-top: 10px">' + 
                                            '<div>' + 
                                                '<button class="icon-redes-sociales p-0">' + 
                                                    '<img src="/img/redes sociales/twitter.png" class="w-100" />' + 
                                                '</button>' + 
                                            '</div>' + 
                                            '<div>' + 
                                                '<button class="icon-redes-sociales p-0">' + 
                                                    '<img src="/img/redes sociales/facebook.png" class="w-100" />' + 
                                                '</button>' + 
                                            '</div>' + 
                                            '<div>' + 
                                                '<button class="icon-redes-sociales p-0">' + 
                                                    '<img src="/img/redes sociales/instagram.png" class="w-100" />' + 
                                                '</button>' + 
                                            '</div>' + 
                                        '</div>' + 
                                    '</div>' + 
                                '</div> ');

        $('#div-victoria').show();
    }
}

// Buscar en la API los datos que el jugador está introduciendo en el cuadro de búsqueda y muestra de los resultados de búsqueda
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
                                                id: jugadorData.player.id,
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
                                                '<div onmouseenter="mouseEnterDivResultBusq(this)" onclick="clickDivResultBusq(' + jugador.id + ', \'' + jugador.imagen + '\')" class="div-result-busq fuentePrincipal">' +
                                                '<span class="fuentePrincipal">' + jugador.nombre + '</span>' +
                                                '<div class="div-info-jugador" data-jugador-id="' + jugador.id + '" data-jugador-nombre="' + jugador.nombre + '" data-jugador-img="' + jugador.imagen + '" data-jugador-edad="' + jugador.edad + '" data-jugador-nacionalidad="' + jugador.nacionalidad + '"></div>' +
                                                '</div>'
                                            );
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