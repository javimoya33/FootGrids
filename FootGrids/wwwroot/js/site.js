// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

// Array de los años de los datos que se buscarán en la API
var yearsToQuery1 = [2010];
var yearsToQuery2 = [2011, 2015];
var yearsToQuery3 = [2012, 2021];
var yearsToQuery4 = [2013, 2020];
var yearsToQuery5 = [2014, 2016, 2017, 2018, 2022];
var yearsToQuery6 = [2019];
var yearsToQuery7 = [2023];
var yearsToQuery = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];

var txtCasillasRRSS = ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X']

var delayBetweenRequests = 2000; 
var jugadoresAcertados = 8;
var intervalId;
var intervalPts;

var seconds = 0;
var minutes = 0;

var secondsDesdeUltimoAcierto = 0;

var idsEquipo1 = new Set();
var idsEquipo2 = new Set();

const fechaHoy = fechaFormateada();
const fechaSeleccionada = $('#select-fecha-grid').val();

$(document).ready(function () {

    // ***** NO BORRAR - SE UTILIZA PARA SACAR LOS DATOS DE LOS SOLUCIONES DE CADA PARTIDA
    //realizarSolicitud(0, 1);
    /*setTimeout(function () {
        realizarSolicitud(0, 42, 39, 1, true, yearsToQuery);
    }, 0);

    setTimeout(function () {
        realizarSolicitud(0, 42, 39, 2, true, yearsToQuery);
    }, 2000);

    setTimeout(function () {
        realizarSolicitud(0, 42, 39, 3, true, yearsToQuery);
    }, 4000);



    setTimeout(function () {
        realizarSolicitud(0, 505, 135, 1, false, yearsToQuery1);
    }, 6000);

    setTimeout(function () {
        realizarSolicitud(0, 505, 135, 2, false, yearsToQuery1);
    }, 8000);

    setTimeout(function () {
        realizarSolicitud(0, 505, 135, 3, false, yearsToQuery1);
    }, 10000);



    setTimeout(function () {
        realizarSolicitud(0, 529, 140, 1, false, yearsToQuery2);
    }, 6000);

    setTimeout(function () {
        realizarSolicitud(0, 529, 140, 2, false, yearsToQuery2);
    }, 8000);

    setTimeout(function () {
        realizarSolicitud(0, 529, 140, 3, false, yearsToQuery2);
    }, 10000);


    setTimeout(function () {
        realizarSolicitud(0, 49, 39, 1, false, yearsToQuery3);
    }, 6000);

    setTimeout(function () {
        realizarSolicitud(0, 49, 39, 2, false, yearsToQuery3);
    }, 8000);

    setTimeout(function () {
        realizarSolicitud(0, 49, 39, 3, false, yearsToQuery3);
    }, 10000);


    setTimeout(function () {
        realizarSolicitud(0, 157, 78, 1, false, yearsToQuery4);
    }, 6000);

    setTimeout(function () {
        realizarSolicitud(0, 157, 78, 2, false, yearsToQuery4);
    }, 8000);

    setTimeout(function () {
        realizarSolicitud(0, 157, 78, 3, false, yearsToQuery4);
    }, 10000);



    setTimeout(function () {
        realizarSolicitud(0, 541, 140, 1, false, yearsToQuery5);
    }, 6000);

    setTimeout(function () {
        realizarSolicitud(0, 541, 140, 2, false, yearsToQuery5);
    }, 8000);

    setTimeout(function () {
        realizarSolicitud(0, 541, 140, 3, false, yearsToQuery5);
    }, 10000);



    setTimeout(function () {
        realizarSolicitud(0, 40, 39, 1, false, yearsToQuery6);
    }, 6000);

    setTimeout(function () {
        realizarSolicitud(0, 40, 39, 2, false, yearsToQuery6);
    }, 8000);

    setTimeout(function () {
        realizarSolicitud(0, 40, 39, 3, false, yearsToQuery6);
    }, 10000);



    setTimeout(function () {
        realizarSolicitud(0, 50, 39, 1, false, yearsToQuery7);
    }, 6000);

    setTimeout(function () {
        realizarSolicitud(0, 50, 39, 2, false, yearsToQuery7);
    }, 8000);

    setTimeout(function () {
        realizarSolicitud(0, 50, 39, 3, false, yearsToQuery7);
    }, 10000);*/

    let casillasColores = obtenerCasillasColoresEnCookie();
    console.log('CasillasRRSS ' + casillasColores);

    if (casillasColores != null) {

        let caractCasillasColores = casillasColores.split('');

        for (var i = 0; i < 9; i++) {

            txtCasillasRRSS[i] = caractCasillasColores[i];
            console.log('CasillasRRSS ' + txtCasillasRRSS[i] + ' *** ' + i);
        }
    }

    for (var i = 0; i < 9; i++) {

        //console.log('CasillasRRSS ' + txtCasillasRRSS[i]);
    }

    let casillasRellenas = obtenerCasillasResueltasEnCookie(fechaSeleccionada);

    console.log('CasillasRellenas1 ' + casillasRellenas);


    obtenerCasillasResueltasEnCookie(fechaSeleccionada);
    rellenarCasillasResueltas();
    rellenarPuntuacion();
    jugadoresAcertados = numJugadoresAcertados(jugadoresAcertados);

    console.log('Jugadores Acertados ' + jugadoresAcertados);

    // Si en las cookies del navegador hay fecha de la última visita al juego, y la fecha de esa última visitada es igual a la de hoy
    // entonces se recuperará el tiempo transcurrido en la partida y se mostrará en el div del cronómetro
    const ultVisita = obtenerFechaUltVisita();

    if (ultVisita !== null) {

        if (fechaHoy == ultVisita) {

            const tiempoGuardado = obtenerTiempoEnCookie();

            if (tiempoGuardado !== null) {

                $('#div-cronometro').text(tiempoGuardado);

                const arrTiempo = tiempoGuardado.split(":");

                minutes = parseInt(arrTiempo[0]);
                seconds = parseInt(arrTiempo[1]);
            }

            const tiempoDesdeUltimoAcierto = obtenerTiempoDesdeUltimoAciertoEnCookie();

            if (tiempoDesdeUltimoAcierto !== null) {

                secondsDesdeUltimoAcierto = tiempoDesdeUltimoAcierto;
                $('#div-crono-desde-ultimo-acierto').text(tiempoDesdeUltimoAcierto);
            }
        }
        else {
            $('#div-crono-desde-ultimo-acierto').text('0');
            guardarTiempoDesdeUltimoAciertoEnCookie();

            $('#div-cronometro').text('00:00');
            guardarTiempoEnCookie();

            $('#div-puntuacion').text('0');
            guardarPuntuacionEnCookie(0);
        }
    }

    // Guardamos la fecha de hoy en las cookies del navegador como fecha de visita al juego
    guardarUltVisitaEnCookie();

    intervalId = setInterval(updateCrono, 1000);

    // Mostrar div de búsqueda de jugador cuando se clicka en una casilla oculta 
    $('.celda-grid-jug-ocultos').click(function (event) {

        $('#div-busq-jug').append(
            '<div class="d-flex">' +
                '<div class="div-close" onclick="cerrarVentanaBusq()">' + '<img src="../img/close.png" />' + '</div>' + 
                '<div>' + 
                    '<img src="../img/defaultavatar.webp" id="img-jug-seleccionado" />' + 
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

function DateTimeFormateada(fechaString) {
    var partesFecha = fechaString.split("/");
    var dia = parseInt(partesFecha[0], 10);
    var mes = parseInt(partesFecha[1], 10) - 1;  // Restamos 1 porque los meses en JavaScript comienzan desde 0 (enero es 0)
    var anio = parseInt(partesFecha[2], 10);

    // Crear el objeto Date
    var fecha = new Date(anio, mes, dia);

    var fechaFormateada = fecha.getFullYear() + '-' +
        ('0' + (fecha.getMonth() + 1)).slice(-2) + '-' +
        ('0' + fecha.getDate()).slice(-2);

    return fechaFormateada;
}


// Actualizar el crono del juego a cada segundo
function updateCrono() {

    seconds++;
    secondsDesdeUltimoAcierto++;

    if (seconds == 60) {
        seconds = 0;
        minutes++;
    }

    const formatteTime = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    $('#div-cronometro').text(formatteTime);
    $('#div-crono-desde-ultimo-acierto').text(secondsDesdeUltimoAcierto);

    guardarTiempoEnCookie();
    guardarTiempoDesdeUltimoAciertoEnCookie();
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

function guardarTiempoDesdeUltimoAciertoEnCookie() {

    const tiempo = $('#div-crono-desde-ultimo-acierto').text();
    $.cookie('tiempoDesdeUltimoAcierto', tiempo, { expires: 1 });
}

function obtenerTiempoDesdeUltimoAciertoEnCookie() {
    return $.cookie('tiempoDesdeUltimoAcierto');
}

function guardarCasillaColoresEnCookie() {

    var casillasColores = '';

    for (var i = 0; i < 9; i++) {

        casillasColores += txtCasillasRRSS[i];
    }

    $.cookie('casillasColores', casillasColores, { expires: 1 });
}

function obtenerCasillasColoresEnCookie() {

    return $.cookie('casillasColores');
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

function obtenerPuntuacionEnCookie() {
    return $.cookie('puntuacion');
}

function guardarPuntuacionEnCookie(puntuacion) {
    $.cookie('puntuacion', puntuacion, { expires: 1 });
}

function rellenarPuntuacion() {

    if (obtenerPuntuacionEnCookie() !== undefined) {
        $('#div-puntuacion').text(obtenerPuntuacionEnCookie());
    }
}

function obtenerCasillasResueltasEnCookie(fecha) {

    if ($.cookie('casillasResueltas ' + fecha) === undefined || $.cookie('casillasResueltas ' + fecha) === '') {

        $.cookie('casillasResueltas ' + fecha, '0 *** 0 *** 0 *** 0 *** 0 *** 0 *** 0 *** 0 *** 0', { expires: 1 });
    }

    return $.cookie('casillasResueltas ' + fecha);
}

function guardarCasillasResueltasEnCookie(txtCasillasResueltas, fecha) {

    $.cookie('casillasResueltas ' + fecha, txtCasillasResueltas, { expires: 1 });
}

function rellenarNuevaCasilla(idJugador, numeroDeCasilla) {

    let casillasRellenas = obtenerCasillasResueltasEnCookie(fechaSeleccionada);

    console.log('CasillasRellenas1 ' + casillasRellenas + ' *** ' + idJugador + ' *** ' + numeroDeCasilla);

    const arrCasillasRellenas = casillasRellenas.split(' *** ');

    let txtCasillasResueltas = '';

    for (let i = 0; i < arrCasillasRellenas.length; i++) {

        if (i == numeroDeCasilla - 1) {

            arrCasillasRellenas[i] = idJugador;
        }

        txtCasillasResueltas += arrCasillasRellenas[i];

        if (i != arrCasillasRellenas.length - 1) {

            txtCasillasResueltas += ' *** ';
        }
    }

    console.log('CasillasRellenas' + fechaSeleccionada + ' ' + txtCasillasResueltas + ' *** ' + idJugador + ' *** ' + numeroDeCasilla + ' *** ' + jugadoresAcertados);

    guardarCasillasResueltasEnCookie(txtCasillasResueltas, fechaSeleccionada);
}

function rellenarCasillasResueltas() {

    let casillasResueltas = obtenerCasillasResueltasEnCookie(fechaSeleccionada);

    const arrCasillasResueltas = casillasResueltas.split(" *** ");

    for (let i = 0; i < arrCasillasResueltas.length; i++) {

        if (arrCasillasResueltas[i] > 0) {

            let imgCasilla = 'https://media-4.api-sports.io/football/players/' + arrCasillasResueltas[i] + '.png';

            $('.fg-casilla-' + (i + 1)).css('background', 'url("' + imgCasilla + '") center top no-repeat white');
        }
    }
}

// Función utilizada para buscar y obtener las soluciones a cada celda que utilizo para crear la partida
function realizarSolicitud(index, team, league, page, equipo1, yearsQuery) {

    console.log('*******************************************');
    console.log('Index ' + index + ' *** ' + 'Equipo ' + team + ' *** ' + 'Liga ' + league + ' *** ' + 'Pagina ' + page + ' *** ' + 'Equipo1 ' + equipo1);
    console.log('*******************************************');
    if (index < yearsQuery.length) {
        var year = yearsQuery[index];
        var queryString = {
            team: team,
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
                    console.log(jugadorData.player.name + ' *** ' + jugadorData.player.id);

                    var playerId = jugadorData.player.id;

                    if (equipo1 === true) {
                        idsEquipo1.add(playerId);
                    } else {
                        idsEquipo2.add(playerId);
                    }
                });

                // Llamar a la siguiente solicitud después de un retraso
                setTimeout(function () {
                    realizarSolicitud(index + 1, team, league, page, equipo1, yearsQuery);
                }, delayBetweenRequests);

                if (!equipo1 === false && page === 3) {
                    setTimeout(function () {
                        var idsComunes = Array.from(idsEquipo1).filter(id => idsEquipo2.has(id));
                        console.log("IDs de jugadores comunes: " + idsComunes);
                    }, 30000);
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error("Error:", textStatus, errorThrown);

                // Llamar a la siguiente solicitud después de un retraso
                setTimeout(function () {
                    realizarSolicitud(index + 1, team, league, page, equipo1, yearsQuery);
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

// Cuando se clicka sobre un resultado de búsqueda se comprueba si la solución al jugador oculto es correcta y se comprueba si el jugador 
// ya ha resuelto toda la partida
function clickDivResultBusq(idJugador, imgJugador) {

    var numeroSolucion = $('#input-casilla').val();

    var dateTimeFormateado = DateTimeFormateada(fechaSeleccionada);

    console.log('FechaSeleccionada ' + dateTimeFormateado);

    $.ajax({
        type: 'GET',
        url: '/Home/GetSolucionesCasilla',
        data: { numeroSolucion: numeroSolucion, idJugador: idJugador, fechaSeleccionada: dateTimeFormateado },
        success: function (data) {

            var jugadorEncontrado = data.jugadorEncontrado;
            var handicap = data.handicap;

            console.log('DATA ' + jugadorEncontrado + ' *** ' + handicap);

            if (jugadorEncontrado) {
                console.log('Holaaa123');
                $('.fg-casilla-' + numeroSolucion).css('background', 'url("' + imgJugador + '") center top no-repeat white');

                jugadoresAcertados += 1;

                secondsDesdeUltimoAcierto = obtenerTiempoDesdeUltimoAciertoEnCookie();
                console.log('tiempoDesdeUltimoAcierto ' + secondsDesdeUltimoAcierto);

                generarTxtRRSS(handicap, numeroSolucion - 1);
                sumarPuntuacion(handicap, secondsDesdeUltimoAcierto);

                secondsDesdeUltimoAcierto = 0;

                rellenarNuevaCasilla(idJugador, numeroSolucion);

                $('#div-casilla-' + numeroSolucion).find('.div-acierto-celda').css('display', 'block');
                efectoParpadeo(3, '#div-casilla-' + numeroSolucion, true);

                guardarCasillaColoresEnCookie();
                comprobarVictoria();
            }
            else {
                restarPuntuacion();

                $('#div-casilla-' + numeroSolucion).find('.div-fallo-celda').css('display', 'block');
                efectoParpadeo(3, '#div-casilla-' + numeroSolucion, false);
            }
        },
        error: function (xhr, status, error) {
            console.error('Error en la solicitud');
        }
    });

    cerrarVentanaBusq();
}

function generarTextoParaRRSS() {

    var txtCompletoRRSS = '';

    var txtRRSS1 = '⚽ FootGrids del día ';
    var txtRRSS2 = '%0a🏅 Puntuación: ';
    var txtRRSS3 = 'Supérame 👉 https://www.footsandgrids.somee.com/';

    var idGridHoy = $('#grid-hoy').val();
    var puntuacion = $('#div-puntuacion').text();

    var txtCompletoCasillasRRSS = '';
    var contadorCasillasRRSS = 0;

    var cookieCasillasColores = obtenerCasillasColoresEnCookie();
    console.log('CasillaColores ' + cookieCasillasColores);
    var caractCookieCasillasColores = cookieCasillasColores.split('');

    for (var i = 0; i < 9; i++) {

        contadorCasillasRRSS += 1;

        console.log('CasillaColor ' + caractCookieCasillasColores[i])

        txtCompletoCasillasRRSS += obtenerColorParaCasilla(caractCookieCasillasColores[i], i);

        if (contadorCasillasRRSS == 3) {

            txtCompletoCasillasRRSS += '%0a';
            contadorCasillasRRSS = 0;
        }
    }

    txtCompletoRRSS = txtRRSS1 + idGridHoy + txtRRSS2 + '*' + puntuacion + '*' + '%0a' + '%0a' + txtCompletoCasillasRRSS + '%0a' + txtRRSS3;

    return txtCompletoRRSS;
}

function obtenerColorParaCasilla(handicap, numeroSolucion) {

    var txtColorRRSS = '';

    switch (handicap) {

        case '1':
            txtColorRRSS = '🟥';
            break;
        case '2':
            txtColorRRSS = '🟧';
            break;
        case '3':
            txtColorRRSS = '🟨';
            break;
        case '4':
            txtColorRRSS = '🟩';
            break;
        case '5':
            txtColorRRSS = '🟦';
            break;
        case 'X':
            txtColorRRSS = '⬜';
            break;
    }

    return txtColorRRSS;
}

// Comprobamos si el jugador ha resuelto toda la partida y si es así se muestra un marco de victoria
function comprobarVictoria() {

    console.log('Holaaa ' + generarTextoParaRRSS());

    if (jugadoresAcertados >= 9) {

        stopCronometro();

        let crono = $('#div-cronometro').text();

        $('#div-overlay-juego').show();

        $('#div-victoria').append('<div class="d-flex" style="align-items: start">' + 
                                    '<div class="div-close" onclick="cerrarVentanaBusq()"><img src="../img/close-vict.png" /></div>' + 
                                    '<div>' + 
                                        '<img src="/img/trofeo.png" class="pd-10-30" style="width: 9vw" />' + 
                                    '</div>' + 
                                    '<div>' + 
                                    '<div class="fuentePrincipal fs24 color-victoria">¡ENHORABUENA!</div>' + 
                                        '<div class="fuentePrincipal fs12">¡Sos un fenómeno! Las metes como Julián Álvarez.</div>' + 

                                        '<div class="d-flex" style="justify-content: space-around; padding: 10px 0px;">' + 
                                            '<div>' + 
                                                '<div class="fuentePrincipal fs12 text-center">Puntuación</div>' + 
                                                '<div id="div-puntuacion-final" class="fuentePrincipal fs18 text-center color-victoria">0</div>' + 
                                            '</div>' + 

                                            '<div>' + 
                                                '<div class="fuentePrincipal fs12 text-center">Tiempo</div>' + 
                                                '<div id="div-tiempo-final" class="fuentePrincipal fs18 text-center color-victoria">' + crono + '</div>' + 
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
                                                    '<a href="https://api.whatsapp.com/send?text=' + generarTextoParaRRSS() + '" data-action="share / whatsapp / share" style="color: white">' +
                                                        'Holaaa' + 
                                                    '</a>' + 
                                                '</button>' + 
                                            '</div>' + 
                                            '<div>' + 
                                                '<button class="icon-redes-sociales p-0">' + 
                                                    '<a href="whatsapp://send?text=My Text">WhatsApp</a>' +
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

            busqueda = normalizarTexto(busqueda);

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
                    var ligasToQuery = ["140", "141", "39", "135", "78", "61"];
                    var queryString = {
                        search: busqueda
                    };

                    console.log('ApiKey ' + apiKey);

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

                                            // Verificar que el resultado de búsqueda no esté ya repetido entre los que se muestran
                                            var jugadorRepetido = $('#div-result-busq [data-jugador-id="' + jugador.id + '"]').length > 0;

                                            if (!jugadorRepetido) {
                                                $('#div-result-busq').append(
                                                    '<div onmouseenter="mouseEnterDivResultBusq(this)" onclick="clickDivResultBusq(' + jugador.id + ', \'' + jugador.imagen + '\')" class="div-result-busq fuentePrincipal">' +
                                                    '<span class="fuentePrincipal">' + jugador.nombre + '</span>' +
                                                    '<div class="div-info-jugador" data-jugador-id="' + jugador.id + '" data-jugador-nombre="' + jugador.nombre + '" data-jugador-img="' + jugador.imagen + '" data-jugador-edad="' + jugador.edad + '" data-jugador-nacionalidad="' + jugador.nacionalidad + '"></div>' +
                                                    '</div>'
                                                );
                                            }
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
    }, 1200);

    setTimeout(function () {

        var primerDivCritBusq = $('#div-result-busq .div-result-busq:first');

        primerDivCritBusq.css('background-color', '#ffcadd');
        primerDivCritBusq.css('color', '#ff4388');

        mouseEnterDivResultBusq(primerDivCritBusq);
    }, 2500);
}

function generarTxtRRSS(handicap, numeroSolucion) {

    txtCasillasRRSS[numeroSolucion] = handicap;
}

// Sumar puntuación en función del handicap de la solución, del tiempo empleado y del acierto
function sumarPuntuacion(handicap, tiempo) {

    let puntuacion = $('#div-puntuacion').text();

    let ptsDificultad = 80 * handicap;

    let ptsTiempo = 300 - tiempo;

    if (ptsTiempo < 0) {
        ptsTiempo = 0;
    }

    let ptsAcierto = 300;

    console.log('Puntuacion ' + ptsDificultad + ' ***** ' + ptsTiempo + ' ***** ' + ptsAcierto);

    puntuacion = parseInt(puntuacion) + ptsDificultad + ptsTiempo + ptsAcierto;

    efectoCambioPuntuacion(puntuacion, true);
}

// Restar puntuación en caso de que el jugador falle en la solución dada
function restarPuntuacion() {

    let puntuacion = $('#div-puntuacion').text();

    console.log('Entraaa aqui ' + obtenerTiempoDesdeUltimoAciertoEnCookie());

    puntuacion = puntuacion - (80 + parseInt(obtenerTiempoDesdeUltimoAciertoEnCookie()));

    if (puntuacion < 0) {
        puntuacion = 0;
    }

    efectoCambioPuntuacion(puntuacion, false);
}

// Efecto en la suma o resta de la puntuación
function efectoCambioPuntuacion(nuevaPuntuacion, sumar) {

    let valorInicial = parseInt($('#div-puntuacion').text());
    let incremento = nuevaPuntuacion - valorInicial;

    if (!sumar) {
        incremento = valorInicial - nuevaPuntuacion;
        iniciarAnimacionPuntuacion(sumar);
    } else {
        iniciarAnimacionPuntuacion(sumar);
    }

    const duracion = 2000;
    const intervalo = 50;
    let numIncrementos = duracion / intervalo;
    let incrementoPorIntervalo = incremento / numIncrementos;

    let valorActual = valorInicial;
    intervalPts = setInterval(function () {

        if (sumar) {
            valorActual += incrementoPorIntervalo;
        }
        else {
            valorActual -= incrementoPorIntervalo;
        }

        $('#div-puntuacion').text(Math.round(valorActual));
        $('#div-puntuacion-final').text(Math.round(valorActual));

        if (Math.abs(valorActual - nuevaPuntuacion) < Math.abs(incrementoPorIntervalo)) {
            clearInterval(intervalPts);
            $('#div-puntuacion').text(nuevaPuntuacion); // Asegurarse de que la puntuación sea exactamente igual a la nueva puntuación al final.
            $('#div-puntuacion-final').text(nuevaPuntuacion);
            guardarPuntuacionEnCookie($('#div-puntuacion').text());

            detenerAnimacionPuntuacion();
        }
    }, intervalo);
}

// Quitamos las tildes y las ñ a la hora de buscar el nombre de un jugador
function normalizarTexto(texto) {

    texto = texto.replace(/ñ/g, 'n');

    texto = texto.replace(/[áÁäÄ]/g, 'a');
    texto = texto.replace(/[éÉ]/g, 'e');
    texto = texto.replace(/[íÍ]/g, 'i');
    texto = texto.replace(/[óÓöÖ]/g, 'o');
    texto = texto.replace(/[úÚüÜ]/g, 'u');

    texto = texto.replace(/[^\w\s]/g, '');

    return texto;
}

// Efecto utilizado en las casillas cuando se produce un acierto o un fallo
function efectoParpadeo(veces, divCasilla, acierto = true) {

    let divAciertoCelda = $(divCasilla).find('.div-acierto-celda');

    if (!acierto)
    {
        divAciertoCelda = $(divCasilla).find('.div-fallo-celda');
    }

    if (veces === 0) {

        divAciertoCelda.css('display', 'none');
        return;
    }

    divAciertoCelda.animate({ opacity: 1 }, 500, function () {
        divAciertoCelda.animate({ opacity: 0 }, 500, function () {
            efectoParpadeo(veces - 1, divCasilla, acierto);
        })
    });
}

// Efecto que hacer cambio el tamaño de la puntuación mientras va cambiando de cifra
function iniciarAnimacionPuntuacion(acierto) {

    if (acierto) {
        $('#div-puntuacion').css('animation', 'fuenteAcierto 1s infinite alternate');
    }
    else {
        $('#div-puntuacion').css('animation', 'fuenteFallo 1s infinite alternate');
    }
}

// Detiene el efecto anterior
function detenerAnimacionPuntuacion() {

    $('#div-puntuacion').css('animation', 'none');
}

// Función que recupera el número de jugadores acertados cuando vuelves al juego
function numJugadoresAcertados(jugAcertados) {

    let casillasResueltas = obtenerCasillasResueltasEnCookie(fechaSeleccionada);
    const arrCasillasResueltas = casillasResueltas.split(' *** ');

    for (let i = 0; i < arrCasillasResueltas.length; i++)
    {
        if (parseInt(arrCasillasResueltas[i]) > 0) {
            jugAcertados += 1;
        }
    }

    console.log('Jugadores acertados ' + jugAcertados);

    return jugAcertados;
}

// Función que recarga el juego con el grid pasado seleccionado
function seleccionarGridPasado(elemento) {

    var fechaElegida = $(elemento).val();

    fechaElegida = convertirFormatoFecha(fechaElegida) + ' 00:00:00.0000000'

    window.location.href = '/FootGrids?fechaElegida=' + fechaElegida;
}

// Función que convierte el formato fecha mostrado por pantalla en el formato estándar mostrado en la base de datos
function convertirFormatoFecha(fechaConFormatoDDMMYYYY) {
    // Parsear la fecha en formato dd/mm/yyyy
    var partesFecha = fechaConFormatoDDMMYYYY.split('/');
    var dia = partesFecha[0];
    var mes = partesFecha[1] - 1; // Los meses en JavaScript van de 0 a 11
    var anio = partesFecha[2];

    // Crear un objeto Date con el formato deseado (yyyy/mm/dd)
    var fecha = new Date(anio, mes, dia);

    // Formatear la fecha en el formato deseado
    var fechaFormateada = fecha.getFullYear() + '/' + ('0' + (fecha.getMonth() + 1)).slice(-2) + '/' + ('0' + fecha.getDate()).slice(-2);

    return fechaFormateada;
}

function mostrarComoJugar() {

    if ($('#div-como-jugar').is(':visible')) {

        $('#div-como-jugar').hide(200);
        $('#div-temporizador').show(200);
        $('#div-tablero').show(200);
    }
    else {

        $('#div-como-jugar').show(200);
        $('#div-temporizador').hide(200);
        $('#div-tablero').hide(200);
    }
}

function cerrarComoJugar() {

    $('#div-como-jugar').hide(200);
    $('#div-temporizador').show(200);
    $('#div-tablero').show(200);
}