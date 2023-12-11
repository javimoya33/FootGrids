// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

// Array de jugadores con más de 100 internacionalidades
const idJugInternacionales = [874, 1573, 154, 738, 754, 2840, 1982, 105421, 910, 170, 50810, 104195, 2098, 13073, 2677, 159, 521, 614, 144, 151, 440, 157, 115068, 266, 274, 1749, 44326, 373, 42309, 790, 429, 2845, 2874, 1344, 33243, 20, 2452, 33255, 207, 30550, 276, 313, 162, 18944, 522, 2295, 117966, 2296, 115133, 56, 174, 25343, 1436, 49387, 30791, 1464, 853, 307, 18787, 19085, 497, 856, 2419, 2551, 779, 866, 854, 18834, 50820, 16561, 113755, 186, 872, 1370, 1819, 90657, 907, 1631, 259, 2791, 731, 50940, 70775, 18830, 821, 230996, 48462, 18900, 104311, 332, 624, 2886, 18836, 50600, 2779, 1444, 2674, 752, 149, 35534, 505, 2887, 382, 119, 531, 18772, 3244, 31023, 117963, 478, 30738, 673, 642, 481, 2082, 968, 2045, 118050, 50773, 105422];

// Array de los años de los datos que se buscarán en la API
// Arrays de campeones de la Champions
var yearsToQuery1 = [2010];
var yearsToQuery2 = [2011, 2015];
var yearsToQuery3 = [2012, 2021];
var yearsToQuery4 = [2013, 2020];
var yearsToQuery5 = [2014, 2016, 2017, 2018, 2022];
var yearsToQuery6 = [2019];
var yearsToQuery7 = [2023];

// Arrays de campeones de la Libertadores
var yearsToQuery11 = [2010];
var yearsToQuery12 = [2011];
var yearsToQuery13 = [2012];
var yearsToQuery14 = [2013];
var yearsToQuery15 = [2014];
var yearsToQuery16 = [2015, 2018];
var yearsToQuery17 = [2016];
var yearsToQuery18 = [2017];
var yearsToQuery19 = [2019, 2022];
var yearsToQuery20 = [2020, 2021];
var yearsToQuery21 = [2023];

// Arrays de campeones de La Liga
var yearsToQuery11 = [2010, 2011, 2013, 2015, 2016, 2018, 2019, 2023];
var yearsToQuery12 = [2012, 2017, 2020, 2022];
var yearsToQuery13 = [2014, 2021];

// Arrays de campeones de la Serie A Italiana
var yearsToQuery21 = [2010, 2021];
var yearsToQuery22 = [2011, 2022];
var yearsToQuery23 = [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];
var yearsToQuery24 = [2023];

// Arrays de campeones de la Europa League
var yearsToQuery31 = [2010, 2012, 2018];
var yearsToQuery32 = [2011];
var yearsToQuery33 = [2013, 2019];
var yearsToQuery34 = [2014, 2015, 2016, 2020, 2023];
var yearsToQuery35 = [2017];
var yearsToQuery36 = [2021];
var yearsToQuery37 = [2022];

// Arrays de campeones de la Copa del Rey
var yearsToQuery31 = [2009];
var yearsToQuery32 = [2010, 2013, 2022];
var yearsToQuery33 = [2011, 2014, 2015, 2016, 2017, 2020];
var yearsToQuery34 = [2012];
var yearsToQuery35 = [2018];
var yearsToQuery36 = [2019];
var yearsToQuery37 = [2021];

var yearsToQuery1 = [2009];
var yearsToQuery2 = [2010, 2011, 2019, 2020, 2021, 2022];
var yearsToQuery3 = [2012, 2013, 2014, 2015];
var yearsToQuery4 = [2016, 2017];

var yearsToQuery5 = [2009, 2010, 2011];
var yearsToQuery6 = [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];
var yearsToQuery7 = [2023];

var yearsToQuery = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];

var ligasToQuery = [/*"140", */"39"/*, "135"/*, "78", "61", "94", "88", "141"*/];

var txtCasillasRRSS = ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'];

var delayBetweenRequests = 2000; 
var jugadoresAcertados = 0;
var intervalId;
var intervalPts;

var seconds = 0;
var minutes = 0;

var secondsDesdeUltimoAcierto = 0;

var idsEquipo1 = new Set();
var idsEquipo2 = new Set();
var jugadoresComunes = new Set();

const fechaHoy = fechaFormateada();
const fechaSeleccionada = $('#select-fecha-grid').val();

var globalSecretKey = null;

var jugadoresConsultados = new Set();

var numeroSolicitudes = 14;
var numSolicitudesCompletadas = 0;
var jugadoresComunes = new Set();

const TablaAPI = 'players';
const Handicap = 1;
const NumSolucion = 8;
const GridId = 17;

const frasesVictoria = [
    '¡Sos un fenómeno! Las metes como Julián Álvarez.',
    '¡Naguara! Las das en el clavo como si fueras el mismo Soteldo', 
    '¡Eres un bacánazo! Sumas puntos como un driblador al estilo Lucho Díaz', 
    '¡Eres bien chingón, compa! Las rifas como el auténtico Chucky Lozano', 
    '¡Eres un pataza de ley! Las clavas como la Foquita Farfán'
]

$(document).ready(function () {

    // ***** NO BORRAR - SE UTILIZA PARA SACAR LOS DATOS DE LOS SOLUCIONES DE CADA PARTIDA
    //realizarSolicitud(0, 1);
    setTimeout(function () {
        realizarSolicitud(0, 173, 78, 1, true, yearsToQuery);
    }, 0);

    setTimeout(function () {
        realizarSolicitud(0, 173, 78, 2, true, yearsToQuery);
    }, 2000);

    setTimeout(function () {
        realizarSolicitud(0, 173, 78, 3, true, yearsToQuery);
    }, 4000);


    
    setTimeout(function () {
        realizarSolicitud(0, 165, 78, 1, false, yearsToQuery);
    }, 0);

    setTimeout(function () {
        realizarSolicitud(0, 165, 78, 2, false, yearsToQuery);
    }, 2000);

    setTimeout(function () {
        realizarSolicitud(0, 165, 78, 3, false, yearsToQuery);
    }, 4000);
    


    obtenerCasillasColoresEnCookie(function (casillasColores) {

        if (casillasColores != null) {

            let caractCasillasColores = casillasColores.split('');

            for (var i = 0; i < 9; i++) {

                txtCasillasRRSS[i] = caractCasillasColores[i];
            }
        }
    });


    obtenerCasillasResueltasEnCookie(fechaSeleccionada, function (casillasResueltas) {

        if (casillasResueltas !== null) {

            rellenarCasillasResueltas();
            rellenarPuntuacion();

            numJugadoresAcertados(jugadoresAcertados, function (total) {

                jugadoresAcertados = total;
            });
        }
    });

    // Si en las cookies del navegador hay fecha de la última visita al juego, y la fecha de esa última visitada es igual a la de hoy
    // entonces se recuperará el tiempo transcurrido en la partida y se mostrará en el div del cronómetro

    obtenerFechaUltVisita(function (ultVisita) {

        if (ultVisita !== null) {

            if (fechaHoy == ultVisita) {

                obtenerTiempoEnCookie(function (tiempoGuardado) {

                    if (tiempoGuardado !== null) {

                        $('#div-cronometro').text(tiempoGuardado);

                        const arrTiempo = tiempoGuardado.split(":");

                        minutes = parseInt(arrTiempo[0]);
                        seconds = parseInt(arrTiempo[1]);
                    }

                    obtenerTiempoDesdeUltimoAciertoEnCookie(function (tiempoDesdeUltimoAcierto) {

                        if (tiempoDesdeUltimoAcierto !== null) {

                            secondsDesdeUltimoAcierto = tiempoDesdeUltimoAcierto;
                            $('#div-crono-desde-ultimo-acierto').text(tiempoDesdeUltimoAcierto);
                        }
                    });
                });
            }
            else {
                $('#div-crono-desde-ultimo-acierto').text('0');
                guardarTiempoDesdeUltimoAciertoEnCookie();

                $('#div-cronometro').text('00:00');
                guardarTiempoEnCookie();

                $('#div-puntuacion').text('0');
                guardarPuntuacionEnCookie('0');
            }
        }

        // Guardamos la fecha de hoy en las cookies del navegador como fecha de visita al juego
        guardarUltVisitaEnCookie();

        intervalId = setInterval(updateCrono, 1000);
    });
    

    // Mostrar div de búsqueda de jugador cuando se clicka en una casilla oculta 
    $('#div-tablero').on('click', '.celda-grid-jug-ocultos', function (event) {

        $('#div-busq-jug').append(
            '<div class="d-flex">' +
                '<div class="div-close" onclick="cerrarVentanaBusq()">' + '<img src="../img/close.png" alt="Logo de cerrar ventana" />' + '</div>' + 
                '<div>' + 
                    '<img src="../img/defaultavatar.webp" id="img-jug-seleccionado" alt="Imagen de jugador seleccionado" />' + 
                '</div>' + 
                '<div id="div-jug-info-seleccionado" class="fuentePrincipal colorFuenteTerciaria d-grid" style="place-content: center;">' + 
                    '<img src="../img/campo_busq_jug.png" alt="Info de jugador seleccionado" style="width: 100%" />' + 
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

    $('#div-victoria').click(function (event) {
        event.stopPropagation();
    });

    // Ocultar div de búsqueda de jugador cuando se clicka fuera de su contenedor 
    $(document).click(function () {
        $('#div-busq-jug').hide(200);
        $('#div-busq-jug').empty();
        $('#div-overlay-juego').hide();
        $('#div-victoria').hide(200);
        $('#div-victoria').empty();
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

    if (globalSecretKey) {

        const tiempo = $('#div-cronometro').text();
        var tiempoEncriptado = CryptoJS.AES.encrypt(tiempo, globalSecretKey).toString();

        $.cookie('tiempoJuego', tiempoEncriptado, { expires: 1 });
    }
    else {

        $.getJSON("/Home/GetSecretKey", function (secretKey) {

            if (secretKey) {

                globalSecretKey = secretKey;

                const tiempo = $('#div-cronometro').text();
                var tiempoEncriptado = CryptoJS.AES.encrypt(tiempo, secretKey).toString();

                $.cookie('tiempoJuego', tiempoEncriptado, { expires: 1 });
            }
        });
    }
}

// Obtener la cookie que contiene el tiempo de juego transcurrido
function obtenerTiempoEnCookie(callback) {

    if ($.cookie('tiempoJuego') === undefined || $.cookie('tiempoJuego') === '') {

        guardarTiempoEnCookie();
    }

    if (globalSecretKey != null) {

        var tiempoJuegoEncriptado = $.cookie('tiempoJuego');
        var tiempoJuegoDesencriptado = CryptoJS.AES.decrypt(tiempoJuegoEncriptado, globalSecretKey).toString(CryptoJS.enc.Utf8);
        callback(tiempoJuegoDesencriptado);
    }
    else {

        $.getJSON("/Home/GetSecretKey", function (secretKey) {

            if (secretKey) {

                globalSecretKey = secretKey;

                var tiempoJuegoEncriptado = $.cookie('tiempoJuego');
                var tiempoJuegoDesencriptado = CryptoJS.AES.decrypt(tiempoJuegoEncriptado, secretKey).toString(CryptoJS.enc.Utf8);

                callback(tiempoJuegoDesencriptado);
            }
            else {

                callback(null);
            }
        });
    }
}

function guardarTiempoDesdeUltimoAciertoEnCookie() {

    if (globalSecretKey != null) {

        const tiempo = $('#div-crono-desde-ultimo-acierto').text();
        var tiempoEncriptado = CryptoJS.AES.encrypt(tiempo, globalSecretKey).toString();

        $.cookie('tiempoDesdeUltimoAcierto', tiempoEncriptado, { expires: 1 });
    }
    else {

        $.getJSON("/Home/GetSecretKey", function (secretKey) {

            if (secretKey) {

                globalSecretKey = secretKey;

                const tiempoDesdeUltimoAcierto = $('#div-crono-desde-ultimo-acierto').text();
                var tiempoEncriptado = CryptoJS.AES.encrypt(tiempoDesdeUltimoAcierto, secretKey).toString();

                $.cookie('tiempoDesdeUltimoAcierto', tiempoEncriptado, { expires: 1 });
            }
        });
    }
}

function obtenerTiempoDesdeUltimoAciertoEnCookie(callback) {

    if ($.cookie('tiempoDesdeUltimoAcierto') === undefined || $.cookie('tiempoDesdeUltimoAcierto') === '') {

        guardarTiempoDesdeUltimoAciertoEnCookie();
    }

    if (globalSecretKey != null) {

        var tiempoJuegoEncriptado = $.cookie('tiempoDesdeUltimoAcierto');
        var tiempoJuegoDesencriptado = CryptoJS.AES.decrypt(tiempoJuegoEncriptado, globalSecretKey).toString(CryptoJS.enc.Utf8);

        callback(tiempoJuegoDesencriptado);
    }
    else {

        $.getJSON("/Home/GetSecretKey", function (secretKey) {

            if (secretKey) {

                globalSecretKey = secretKey;

                var tiempoJuegoEncriptado = $.cookie('tiempoDesdeUltimoAcierto');
                var tiempoJuegoDesencriptado = CryptoJS.AES.decrypt(tiempoJuegoEncriptado, secretKey).toString(CryptoJS.enc.Utf8);

                callback(tiempoJuegoDesencriptado);
            }
            else {

                callback(null);
            }
        });
    }
}

function guardarCasillaColoresEnCookie() {

    var casillasColores = '';

    for (var i = 0; i < 9; i++) {

        casillasColores += txtCasillasRRSS[i];
    }

    if (globalSecretKey != null) {

        var casillasColoresEncriptado = CryptoJS.AES.encrypt(casillasColores, globalSecretKey).toString();
        $.cookie('casillasColores', casillasColoresEncriptado, { expires: 1 });
    }
    else {

        $.getJSON("/Home/GetSecretKey", function (secretKey) {

            if (secretKey) {

                globalSecretKey = secretKey;

                var casillasColoresEncriptado = CryptoJS.AES.encrypt(casillasColores, secretKey).toString();
                $.cookie('casillasColores', casillasColoresEncriptado, { expires: 1 });
            }
        });
    }
}

function obtenerCasillasColoresEnCookie(callback) {

    if ($.cookie('casillasColores') === undefined || $.cookie('casillasColores') === '') {

        guardarCasillaColoresEnCookie();
    }

    if (globalSecretKey != null) {

        var casillasColoresEncriptado = $.cookie('casillasColores');
        var casillasColoresDesencriptado = CryptoJS.AES.decrypt(casillasColoresEncriptado, globalSecretKey).toString(CryptoJS.enc.Utf8);

        callback(casillasColoresDesencriptado);
    }
    else {

        $.getJSON("/Home/GetSecretKey", function (secretKey) {

            if (secretKey) {

                globalSecretKey = secretKey;

                var casillasColoresEncriptado = $.cookie('casillasColores');
                var casillasColoresDesencriptado = CryptoJS.AES.decrypt(casillasColoresEncriptado, secretKey).toString(CryptoJS.enc.Utf8);

                callback(casillasColoresDesencriptado);
            }
            else {

                callback(null);
            }
        });
    }
    return null;
}

// Guardar la fecha de la última visita al juego en una cookie del navegador 
function guardarUltVisitaEnCookie() {

    if (globalSecretKey != null) {

        var fechaUltVisita = fechaFormateada();
        const fechaUltVisitaEncriptado = CryptoJS.AES.encrypt(fechaUltVisita, globalSecretKey).toString();
        $.cookie('ultVisita', fechaUltVisitaEncriptado, { expires: 1 });
    }
    else {

        $.getJSON("/Home/GetSecretKey", function (secretKey) {

            if (secretKey) {

                globalSecretKey = secretKey;

                var fechaUltVisita = fechaFormateada();
                const fechaUltVisitaEncriptado = CryptoJS.AES.encrypt(fechaUltVisita, globalSecretKey).toString();
                $.cookie('ultVisita', fechaUltVisitaEncriptado, { expires: 1 });
            }
        });
    }
}

// Obtener la cookie que aloja la fecha de la última visita al juego
function obtenerFechaUltVisita(callback) {

    if ($.cookie('ultVisita') === undefined || $.cookie('ultVisita') === '') {

        guardarUltVisitaEnCookie();
    }

    if (globalSecretKey != null) {

        var fechaUltVisitaEncriptado = $.cookie('ultVisita');
        var fechaUltVisitaDesencriptado = CryptoJS.AES.decrypt(fechaUltVisitaEncriptado, globalSecretKey).toString(CryptoJS.enc.Utf8);

        callback(fechaUltVisitaDesencriptado);
    }
    else {

        $.getJSON("/Home/GetSecretKey", function (secretKey) {

            if (secretKey) {

                globalSecretKey = secretKey;

                var fechaUltVisitaEncriptado = $.cookie('ultVisita');
                var fechaUltVisitaDesencriptado = CryptoJS.AES.decrypt(fechaUltVisitaEncriptado, secretKey).toString(CryptoJS.enc.Utf8);

                callback(fechaUltVisitaDesencriptado);
            }
            else {

                callback(null);
            }
        });
    }
}

function guardarPuntuacionEnCookie(puntuacion) {

    if (globalSecretKey != null) {

        const puntuacionEncriptado = CryptoJS.AES.encrypt(puntuacion, globalSecretKey).toString();
        $.cookie('puntuacion', puntuacionEncriptado, { expires: 1 });
    }
    else {

        $.getJSON("/Home/GetSecretKey", function (secretKey) {

            if (secretKey) {

                globalSecretKey = secretKey;

                const puntuacionEncriptado = CryptoJS.AES.encrypt(puntuacion, globalSecretKey).toString();
                $.cookie('puntuacion', puntuacionEncriptado, { expires: 1 });
            }
        });
    }
}

function obtenerPuntuacionEnCookie(callback) {

    if ($.cookie('puntuacion') === undefined || $.cookie('puntuacion') === '') {

        guardarPuntuacionEnCookie('0');
    }

    if (globalSecretKey != null) {

        var puntuacionEncriptado = $.cookie('puntuacion');
        var puntuacionDesencriptado = CryptoJS.AES.decrypt(puntuacionEncriptado, globalSecretKey).toString(CryptoJS.enc.Utf8);

        callback(puntuacionDesencriptado);
    }
    else {

        $.getJSON("/Home/GetSecretKey", function (secretKey) {

            if (secretKey) {

                globalSecretKey = secretKey;

                var puntuacionEncriptado = $.cookie('puntuacion');
                var puntuacionDesencriptado = CryptoJS.AES.decrypt(puntuacionEncriptado, globalSecretKey).toString(CryptoJS.enc.Utf8);

                callback(puntuacionDesencriptado);
            }
            else {

                callback(null);
            }
        });
    }
}

function rellenarPuntuacion() {

    obtenerPuntuacionEnCookie(function (puntuacion) {

        $('#div-puntuacion').text(puntuacion);
    });
}

function guardarCasillasResueltasEnCookie(txtCasillasResueltas, fecha) {

    if (globalSecretKey != null) {

        const casillasResueltasEncriptado = CryptoJS.AES.encrypt(txtCasillasResueltas, globalSecretKey).toString();
        $.cookie('casillasResueltas ' + fecha, casillasResueltasEncriptado, { expires: 1 });
    }
    else {

        $.getJSON("/Home/GetSecretKey", function (secretKey) {

            if (secretKey) {

                globalSecretKey = secretKey;

                const casillasResueltasEncriptado = CryptoJS.AES.encrypt(txtCasillasResueltas, globalSecretKey).toString();
                $.cookie('casillasResueltas ' + fecha, casillasResueltasEncriptado, { expires: 1 });
            }
            else {

                callback(null);
            }
        });
    }
}

function obtenerCasillasResueltasEnCookie(fecha, callback) {

    if ($.cookie('casillasResueltas ' + fecha) === undefined || $.cookie('casillasResueltas ' + fecha) === '') {

        txtCasillasResueltas = '0 *** 0 *** 0 *** 0 *** 0 *** 0 *** 0 *** 0 *** 0';
        guardarCasillasResueltasEnCookie(txtCasillasResueltas, fecha);
    }

    if (globalSecretKey != null) {

        var casillasResueltasEncriptado = $.cookie('casillasResueltas ' + fecha);
        var casillasResueltasDesencriptado = CryptoJS.AES.decrypt(casillasResueltasEncriptado, globalSecretKey).toString(CryptoJS.enc.Utf8);

        callback(casillasResueltasDesencriptado);
    }
    else {

        $.getJSON("/Home/GetSecretKey", function (secretKey) {

            if (secretKey) {

                globalSecretKey = secretKey;

                var casillasResueltasEncriptado = $.cookie('casillasResueltas ' + fecha);
                var casillasResueltasDesencriptado = CryptoJS.AES.decrypt(casillasResueltasEncriptado, globalSecretKey).toString(CryptoJS.enc.Utf8);

                callback(casillasResueltasDesencriptado);
            }
            else {

                callback(null);
            }
        });
    }
}

function rellenarNuevaCasilla(idJugador, numeroDeCasilla) {

    obtenerCasillasResueltasEnCookie(fechaSeleccionada, function (casillasRellenas) {

        if (casillasRellenas !== null) {

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

            guardarCasillasResueltasEnCookie(txtCasillasResueltas, fechaSeleccionada);
        }
    });
}

function rellenarCasillasResueltas() {

    obtenerCasillasResueltasEnCookie(fechaSeleccionada, function (casillasResueltas) {

        const arrCasillasResueltas = casillasResueltas.split(" *** ");

        for (let i = 0; i < arrCasillasResueltas.length; i++) {

            if (arrCasillasResueltas[i] > 0) {

                let imgCasilla = 'https://media-4.api-sports.io/football/players/' + arrCasillasResueltas[i] + '.png';

                $('.fg-casilla-' + (i + 1)).css('background', 'url("' + imgCasilla + '") center top no-repeat white');
                $('.fg-casilla-' + (i + 1)).removeClass('celda-grid-jug-ocultos');
                $('.fg-casilla-' + (i + 1)).addClass('celda-grid-jug-resueltos');
            }
        }
    });
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

                    jugadoresComunes.add(jugadorData.player);
                });

                // Llamar a la siguiente solicitud después de un retraso
                setTimeout(function () {
                    realizarSolicitud(index + 1, team, league, page, equipo1, yearsQuery);
                }, delayBetweenRequests);

                if (!equipo1 === false && page === 3) {
                    setTimeout(function () {
                        var idsComunes = Array.from(idsEquipo1).filter(id => idsEquipo2.has(id));

                        numSolicitudesCompletadas++;
                        console.log('Numero Solitudes Completadas: ' + numSolicitudesCompletadas);

                        if (numSolicitudesCompletadas >= numeroSolicitudes) {

                            var jugadoresComunesArray = Array.from(jugadoresComunes).filter(jugador => idsComunes.includes(jugador.id));

                            var jugadoresComunesUnicos = new Set(jugadoresComunesArray.map(jugador => jugador.id));

                            // Crear un nuevo array con elementos únicos
                            var jugadoresComunesUnicosArray = Array.from(jugadoresComunesUnicos).map(id => {
                                return jugadoresComunesArray.find(jugador => jugador.id === id);
                            });

                            jugadoresComunesUnicosArray.forEach(function (jugador) {

                                console.log("IDs de jugadores comunes: " + jugador.id + ' *** Nombre: ' + jugador.name);

                                var IdAPI = jugador.id;

                                $.ajax({
                                    url: "/Home/CrearSolucion",
                                    type: "POST",
                                    contentType: "application/json",  // Establecer el tipo de contenido como JSON
                                    dataType: "json",
                                    data: JSON.stringify({
                                        IdAPI: IdAPI,
                                        TablaAPI: TablaAPI,
                                        Handicap: Handicap,
                                        NumSolucion: NumSolucion,
                                        GridId: GridId
                                    }),
                                    success: function (response) {
                                        console.log("Respuesta del servidor:", response);

                                        // Aquí puedes manejar la respuesta si es necesario
                                    },
                                    error: function (xhr, textStatus, errorThrown) {
                                        console.error("Error:", textStatus, errorThrown);
                                    }
                                });
                            });
                        }
                    }, 3000);
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

function obtenerGridPorId(gridId, successCallback, errorCallback) {
    $.ajax({
        url: "/Home/ObtenerGridPorId",  // Reemplaza con la ruta correcta de tu controlador
        type: "GET",
        dataType: "json",
        data: { Id: gridId },
        success: function (data) {
            // Llama al callback de éxito con los datos obtenidos
            successCallback(data);
        },
        error: function (xhr, textStatus, errorThrown) {
            // Llama al callback de error con la información del error
            errorCallback(xhr, textStatus, errorThrown);
        }
    });
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

    if (jugadorNombre !== undefined) {

        $('#img-jug-seleccionado').attr('src', jugadorImg);

        $('#div-jug-info-seleccionado').empty();
        $('#div-jug-info-seleccionado').append(
            '<div>Nombre: ' + jugadorNombre + '</div>' +
            '<div>Edad: ' + jugadorEdad + '</div>' +
            '<div>Nacionalidad: ' + jugadorNacionalidad + '</div>');
    }
}

// Cuando se clicka sobre un resultado de búsqueda se comprueba si la solución al jugador oculto es correcta y se comprueba si el jugador 
// ya ha resuelto toda la partida
function clickDivResultBusq(idJugador, imgJugador) {

    var numeroSolucion = $('#input-casilla').val();
    var dateTimeFormateado = DateTimeFormateada(fechaSeleccionada);

    $.ajax({
        type: 'GET',
        url: '/Home/GetSolucionesCasilla',
        data: { numeroSolucion: numeroSolucion, idJugador: idJugador, fechaSeleccionada: dateTimeFormateado },
        success: function (data) {

            var jugadorEncontrado = data.jugadorEncontrado;
            var handicap = data.handicap;

            if (jugadorEncontrado) {
                $('.fg-casilla-' + numeroSolucion).css('background', 'url("' + imgJugador + '") center top no-repeat white');
                $('.fg-casilla-' + numeroSolucion).removeClass('celda-grid-jug-ocultos');
                $('.fg-casilla-' + numeroSolucion).addClass('celda-grid-jug-resueltos');

                jugadoresAcertados += 1;

                obtenerTiempoDesdeUltimoAciertoEnCookie(function (segundos) {

                    generarTxtRRSS(handicap, numeroSolucion - 1);
                    sumarPuntuacion(handicap);

                    secondsDesdeUltimoAcierto = 0;
                    $('#div-crono-desde-ultimo-acierto').text(secondsDesdeUltimoAcierto);
                    guardarTiempoDesdeUltimoAciertoEnCookie();

                    rellenarNuevaCasilla(idJugador, numeroSolucion);

                    $('#div-casilla-' + numeroSolucion).find('.div-acierto-celda').css('display', 'block');
                    efectoParpadeo(3, '#div-casilla-' + numeroSolucion, true);

                    guardarCasillaColoresEnCookie();
                    comprobarVictoria();
                });
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

function generarTextoParaRRSS(callback) {

    var txtCompletoRRSS = '';

    var txtRRSS1 = '⚽ FootGrids del día ';
    var txtRRSS2 = '%0a🏅 Puntuación: ';
    var txtRRSS3 = 'Supérame 👉 https://www.footsandgrids.somee.com/';

    var idGridHoy = $('#grid-hoy').val();
    var puntuacion = $('#div-puntuacion').text();

    var txtCompletoCasillasRRSS = '';
    var contadorCasillasRRSS = 0;

    obtenerCasillasColoresEnCookie(function (cookieCasillasColores) {

        var caractCookieCasillasColores = cookieCasillasColores.split('');

        for (var i = 0; i < 9; i++) {

            contadorCasillasRRSS += 1;

            txtCompletoCasillasRRSS += obtenerColorParaCasilla(caractCookieCasillasColores[i], i);

            if (contadorCasillasRRSS == 3) {

                txtCompletoCasillasRRSS += '%0a';
                contadorCasillasRRSS = 0;
            }
        }

        txtCompletoRRSS = txtRRSS1 + idGridHoy + txtRRSS2 + '*' + puntuacion + '*' + '%0a' + '%0a' + txtCompletoCasillasRRSS + '%0a' + txtRRSS3;
        callback(txtCompletoRRSS);
    });
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

    if (jugadoresAcertados >= 9) {

        stopCronometro();

        let crono = $('#div-cronometro').text();

        $('#div-overlay-juego').show();

        var numAleatorioParaFrase = Math.floor(Math.random() * frasesVictoria.length);
        var fraseAleatoria = frasesVictoria[numAleatorioParaFrase];

        generarTextoParaRRSS(function(textoRRSS) {

            $('#div-victoria').append('<div class="d-flex" style="align-items: start">' +
                                        /*'<div class="div-close" onclick="cerrarVentanaBusq()"><img src="../img/close-vict.png" /></div>' +*/
                                        '<div>' +
                                            '<img src="/img/trofeo.png" alt="Logo de victoria" class="img-trofeo pd-10-30" />' +
                                        '</div>' +
                                        '<div>' +
                                            '<div class="fuentePrincipal fs24 color-victoria">¡ENHORABUENA!</div>' +
                                                '<div class="fuentePrincipal fs12">' + fraseAleatoria + '</div>' +
                                            '<div class="d-flex" style="justify-content: space-around; padding: 10px 0px;">' +
                                                '<div>' +
                                                    '<div class="fuentePrincipal fs12 text-center">Puntuación</div>' +
                                                    '<div id="div-puntuacion-final" class="fuentePrincipal fs18 text-center color-victoria">0</div>' +
                                                '</div>' +

                                                '<div>' +
                                                    '<div class="fuentePrincipal fs12 text-center">Tiempo</div>' +
                                                    '<div id="div-tiempo-final" class="fuentePrincipal fs18 text-center color-victoria">' + crono + '</div>' +
                                                '</div>' +

                                                '<div>' + 
                                                    '<div class="fuentePrincipal fs12 text-center">Siguiente partida</div>' + 
                                                    '<div id="div-tiempo-sig-partida" class="fuentePrincipal fs18 text-center color-victoria">00:00:00</div>' + 
                                                '</div>' + 
                                            '</div>' +

                                            '<div class="fuentePrincipal fs12">Compártelo con tus pibes en redes sociales, che.</div>' +
                                            '<div class="d-flex" style="justify-content: space-around; padding-top: 10px">' +
                                                '<div>' +
                                                '</div>' +
                                                '<div>' +
                                                    '<a href="https://api.whatsapp.com/send?text=' + textoRRSS + '"  target="_blank" class="icon-redes-sociales p-0" data-action="share / whatsapp / share" style="color: white">' +
                                                        '<img src="/img/redes sociales/whatsapp.png" alt="Logo de compartir por Whatsapp" class="w-100" />' +
                                                    '</a>' +
                                                '</div>' +
                                                '<div>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div> ');

            $('#div-victoria').show();
        });

        obtenerTiempoParaSiguientePartida();

        setInterval(obtenerTiempoParaSiguientePartida, 1000);
    }
}

// Obtener el tiempo que queda entre ahora y mañana a las 12 de la noche
function obtenerTiempoParaSiguientePartida() {

    var horaActual = new Date();

    var horaManana = new Date();
    horaManana.setHours(24, 0, 0, 0);

    var diferenciaMilisegundos = horaManana - horaActual;

    var horas = Math.floor(diferenciaMilisegundos / 3600000);
    var minutos = Math.floor((diferenciaMilisegundos % 3600000) / 60000);
    var segundos = Math.floor((diferenciaMilisegundos % 60000) / 1000);

    if (horas < 10) {
        horas = '0' + horas;
    }

    if (minutos < 10) {
        minutos = '0' + minutos;
    }

    if (segundos < 10) {
        segundos = '0' + segundos;
    }

    var diferenciaTexto = horas + ':' + minutos + ':' + segundos;

    $('#div-tiempo-sig-partida').text(diferenciaTexto);
}

// Buscar en la API los datos que el jugador está introduciendo en el cuadro de búsqueda y muestra de los resultados de búsqueda
function escribirBuscadorJugador() {

    $('#div-result-busq').empty();

    var busqueda = $('#input-busq-jug').val();

    setTimeout(function(){

        if ($('#input-busq-jug').val() == busqueda) {

            busqueda = normalizarTexto(busqueda);

            var urlKeys = "/Home/GetApiKeys";

            $.ajax({
                url: urlKeys,
                type: "GET",
                dataType: "json",
                success: function (data) {

                    var url = "https://api-football-v1.p.rapidapi.com/v3/players";
                    var apiKey = data.rapidAPIKey;
                    var apiHost = data.rapidAPIHost;
                    var queryString = {
                        search: busqueda
                    };

                    // Objeto para almacenar todos los datos procesados por liga
                    var allDatosProcesados = {};
                    var ligasBuscadas = 0;
                    var iteracciones = 0;
                    var maxIteracciones = 50;
                    var datosProcesados = [];

                    // Función para realizar la búsqueda en una liga específica
                    function buscarEnLiga(liga, pagina) {
                        return $.ajax({
                            url: url,
                            type: "GET",
                            dataType: "json",
                            headers: {
                                "X-RapidAPI-Key": apiKey,
                                "X-RapidAPI-Host": apiHost
                            },
                            data: { ...queryString, league: liga, page: pagina },
                        });
                    }

                    // Array de promesas para las solicitudes AJAX
                    var promesas = [];
                    ligasToQuery.forEach(function (liga) {
                        promesas.push(buscarEnLiga(liga, 1));
                        promesas.push(buscarEnLiga(liga, 2));
                        promesas.push(buscarEnLiga(liga, 3));
                    });

                    // Ejecutar todas las promesas y esperar a que todas se resuelvan
                    Promise.all(promesas)
                        .then(function (results) {
                            // Procesar los resultados de todas las solicitudes
                            results.forEach(function (data) {
                                if (data && data.response) {
                                    data.response.forEach(function (jugadorData) {
                                        if (iteracciones < maxIteracciones) {

                                            var ultimaEstadistica = jugadorData.statistics[0];
                                            var ultTemporada = ultimaEstadistica.league.season.toString();
                                            const arrUltTemporada = ultTemporada.split("-");

                                            const liga = jugadorData.statistics[0].league.id;

                                            if (arrUltTemporada[0] >= 2009) {

                                                // Verificar si un jugador no tiene el nombre completo en jugadorData.player.name
                                                if (jugadorData.player.name.includes(". ")) {

                                                    // Split de nombre para que solo muestre en el criterio de búsqueda el primer nombre si es compuesto
                                                    const arrNombreJugador = jugadorData.player.firstname.split(" ");

                                                    datosProcesados.push({
                                                        id: jugadorData.player.id,
                                                        nombre: arrNombreJugador[0] + ' ' + jugadorData.player.lastname,
                                                        imagen: jugadorData.player.photo,
                                                        edad: jugadorData.player.age,
                                                        nacionalidad: jugadorData.player.nationality,
                                                        liga: liga,
                                                        ultTemporada: arrUltTemporada[0]
                                                    });
                                                }
                                                else {

                                                    datosProcesados.push({
                                                        id: jugadorData.player.id,
                                                        nombre: jugadorData.player.name,
                                                        imagen: jugadorData.player.photo,
                                                        edad: jugadorData.player.age,
                                                        nacionalidad: jugadorData.player.nationality,
                                                        liga: liga,
                                                        ultTemporada: arrUltTemporada[0]
                                                    });
                                                }

                                                iteracciones++;
                                            }
                                        } else {
                                            return false;
                                        }
                                    });
                                }
                                ligasBuscadas++;
                            });


                            datosProcesados.sort(function (a, b) {
                                // Compara las edades para determinar el orden
                                return b.ultTemporada - a.ultTemporada;
                            });

                            datosProcesados.forEach(function (jugador) {

                                // Verificar que el resultado de búsqueda no esté ya repetido entre los que se muestran
                                var jugadorRepetido = $('#div-result-busq [data-jugador-id="' + jugador.id + '"]').length > 0;

                                if (!jugadorRepetido) {
                                    $('#div-result-busq').append(
                                        '<div onmouseenter="mouseEnterDivResultBusq(this)" onclick="clickDivResultBusq(' + jugador.id + ', \'' + jugador.imagen + '\')" class="div-result-busq fuentePrincipal">' +
                                        '<img src="' + jugador.imagen + '" class="img-foto-jugador-busq">' +
                                        '<span class="fuentePrincipal">' + jugador.nombre + '</span>' +
                                        '<div class="div-info-jugador" data-jugador-id="' + jugador.id + '" data-jugador-nombre="' + jugador.nombre + '" data-jugador-img="' + jugador.imagen + '" data-jugador-edad="' + jugador.edad + '" data-jugador-nacionalidad="' + jugador.nacionalidad + '"></div>' +
                                        '</div>'
                                    );
                                }

                            });
                        })
                        .catch(function (error) {
                            console.error("Error en alguna solicitud AJAX:", error);
                        });
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.error("Error:", textStatus, errorThrown);
                }
            });
        }
    }, 1200);

    setTimeout(function () {

        $('#div-result-busq').on('mouseenter', '.div-result-busq', function (event) {

            $('.div-result-busq').css('background-color', '#eee');
            $('.div-result-busq').css('color', '#212529');

            $(this).css('background-color', 'rgb(207 255 202)');
            $(this).css('color', '#67e017');
        });

        var primerDivCritBusq = $('#div-result-busq .div-result-busq:first');

        primerDivCritBusq.css('background-color', 'rgb(207, 255, 202);');
        primerDivCritBusq.css('color', 'rgb(103, 224, 23)');

        mouseEnterDivResultBusq(primerDivCritBusq);
    }, 2500);
}

function generarTxtRRSS(handicap, numeroSolucion) {

    txtCasillasRRSS[numeroSolucion] = handicap;
}

// Sumar puntuación en función del handicap de la solución, del tiempo empleado y del acierto
function sumarPuntuacion(handicap) {

    let puntuacion = $('#div-puntuacion').text();

    let ptsDificultad = 80 * handicap;

    let ptsTiempo = 300 - secondsDesdeUltimoAcierto;

    if (ptsTiempo < 0) {
        ptsTiempo = 0;
    }

    let ptsAcierto = 300;

    puntuacion = parseInt(puntuacion) + ptsDificultad + ptsTiempo + ptsAcierto;

    efectoCambioPuntuacion(puntuacion, true);
}

// Restar puntuación en caso de que el jugador falle en la solución dada
function restarPuntuacion() {

    let puntuacion = $('#div-puntuacion').text();

    obtenerTiempoDesdeUltimoAciertoEnCookie(function (secondsDesdeUltimoAcierto) {

        puntuacion = puntuacion - (80 + parseInt(secondsDesdeUltimoAcierto));

        if (puntuacion < 0) {
            puntuacion = 0;
        }

        efectoCambioPuntuacion(puntuacion, false);
    });
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
function numJugadoresAcertados(jugAcertados, callback) {

    obtenerCasillasResueltasEnCookie(fechaSeleccionada, function (casillasResueltas) {

        const arrCasillasResueltas = casillasResueltas.split(' *** ');

        for (let i = 0; i < arrCasillasResueltas.length; i++) {
            if (parseInt(arrCasillasResueltas[i]) > 0) {
                jugAcertados += 1;
            }
        }

        callback(jugAcertados);
    });
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


function mostrarPoliticaPrivacidad() {

    if ($('#div-politica-privacidad').is(':visible')) {

        $('#div-politica-privacidad').hide(200);
        $('#div-temporizador').show(200);
        $('#div-tablero').show(200);
    }
    else {

        $('#div-politica-privacidad').show(200);
        $('#div-temporizador').hide(200);
        $('#div-tablero').hide(200);
    }
}

function cerrarPoliticaPrivacidad() {

    $('#div-politica-privacidad').hide(200);
    $('#div-temporizador').show(200);
    $('#div-tablero').show(200);
}

function similarity(str1, str2) {
    const set1 = new Set(str1);
    const set2 = new Set(str2);
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    return intersection.size / union.size;
}

function timeOutChampions() {

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
    }, 10000);
}

function timeOutLibertadores() {

    setTimeout(function () {
        realizarSolicitud(0, 119, 71, 1, false, yearsToQuery11);
    }, 6000);

    setTimeout(function () {
        realizarSolicitud(0, 119, 71, 2, false, yearsToQuery11);
    }, 8000);

    setTimeout(function () {
        realizarSolicitud(0, 119, 71, 3, false, yearsToQuery11);
    }, 10000);



    setTimeout(function () {
        realizarSolicitud(0, 128, 71, 1, false, yearsToQuery12);
    }, 6000);

    setTimeout(function () {
        realizarSolicitud(0, 128, 71, 2, false, yearsToQuery12);
    }, 8000);

    setTimeout(function () {
        realizarSolicitud(0, 128, 71, 3, false, yearsToQuery12);
    }, 10000);


    setTimeout(function () {
        realizarSolicitud(0, 131, 71, 1, false, yearsToQuery13);
    }, 6000);

    setTimeout(function () {
        realizarSolicitud(0, 131, 71, 2, false, yearsToQuery13);
    }, 8000);

    setTimeout(function () {
        realizarSolicitud(0, 131, 71, 3, false, yearsToQuery13);
    }, 10000);


    setTimeout(function () {
        realizarSolicitud(0, 117, 71, 1, false, yearsToQuery14);
    }, 6000);

    setTimeout(function () {
        realizarSolicitud(0, 117, 71, 2, false, yearsToQuery14);
    }, 8000);

    setTimeout(function () {
        realizarSolicitud(0, 117, 71, 3, false, yearsToQuery14);
    }, 10000);



    setTimeout(function () {
        realizarSolicitud(0, 460, 133, 1, false, yearsToQuery15);
    }, 6000);

    setTimeout(function () {
        realizarSolicitud(0, 460, 133, 2, false, yearsToQuery15);
    }, 8000);

    setTimeout(function () {
        realizarSolicitud(0, 460, 133, 3, false, yearsToQuery15);
    }, 10000);



    setTimeout(function () {
        realizarSolicitud(0, 435, 133, 1, false, yearsToQuery16);
    }, 6000);

    setTimeout(function () {
        realizarSolicitud(0, 435, 133, 2, false, yearsToQuery16);
    }, 8000);

    setTimeout(function () {
        realizarSolicitud(0, 435, 133, 3, false, yearsToQuery16);
    }, 10000);



    setTimeout(function () {
        realizarSolicitud(0, 1137, 239, 1, false, yearsToQuery17);
    }, 6000);

    setTimeout(function () {
        realizarSolicitud(0, 1137, 239, 2, false, yearsToQuery17);
    }, 8000);

    setTimeout(function () {
        realizarSolicitud(0, 1137, 239, 3, false, yearsToQuery17);
    }, 10000);



    setTimeout(function () {
        realizarSolicitud(0, 130, 71, 1, false, yearsToQuery18);
    }, 6000);

    setTimeout(function () {
        realizarSolicitud(0, 130, 71, 2, false, yearsToQuery18);
    }, 8000);

    setTimeout(function () {
        realizarSolicitud(0, 130, 71, 3, false, yearsToQuery18);
    }, 10000);



    setTimeout(function () {
        realizarSolicitud(0, 127, 71, 1, false, yearsToQuery19);
    }, 6000);

    setTimeout(function () {
        realizarSolicitud(0, 127, 71, 2, false, yearsToQuery19);
    }, 8000);

    setTimeout(function () {
        realizarSolicitud(0, 127, 71, 3, false, yearsToQuery19);
    }, 10000);



    setTimeout(function () {
        realizarSolicitud(0, 121, 71, 1, false, yearsToQuery20);
    }, 6000);

    setTimeout(function () {
        realizarSolicitud(0, 121, 71, 2, false, yearsToQuery20);
    }, 8000);

    setTimeout(function () {
        realizarSolicitud(0, 121, 71, 3, false, yearsToQuery20);
    }, 10000);



    setTimeout(function () {
        realizarSolicitud(0, 124, 71, 1, false, yearsToQuery21);
    }, 6000);

    setTimeout(function () {
        realizarSolicitud(0, 124, 71, 2, false, yearsToQuery21);
    }, 8000);

    setTimeout(function () {
        realizarSolicitud(0, 124, 71, 3, false, yearsToQuery21);
    }, 10000);
}


function timeOutCopaDelRey() {

    setTimeout(function () {
        realizarSolicitud(0, 536, 140, 1, false, yearsToQuery31);
    }, 6000);

    setTimeout(function () {
        realizarSolicitud(0, 536, 140, 2, false, yearsToQuery31);
    }, 8000);

    setTimeout(function () {
        realizarSolicitud(0, 536, 140, 3, false, yearsToQuery31);
    }, 10000);



    setTimeout(function () {
        realizarSolicitud(0, 541, 140, 1, false, yearsToQuery32);
    }, 6000);

    setTimeout(function () {
        realizarSolicitud(0, 541, 140, 2, false, yearsToQuery32);
    }, 8000);

    setTimeout(function () {
        realizarSolicitud(0, 541, 140, 3, false, yearsToQuery32);
    }, 10000);


    setTimeout(function () {
        realizarSolicitud(0, 529, 140, 1, false, yearsToQuery33);
    }, 6000);

    setTimeout(function () {
        realizarSolicitud(0, 529, 140, 2, false, yearsToQuery33);
    }, 8000);

    setTimeout(function () {
        realizarSolicitud(0, 529, 140, 3, false, yearsToQuery33);
    }, 10000);


    setTimeout(function () {
        realizarSolicitud(0, 530, 140, 1, false, yearsToQuery34);
    }, 6000);

    setTimeout(function () {
        realizarSolicitud(0, 530, 140, 2, false, yearsToQuery34);
    }, 8000);

    setTimeout(function () {
        realizarSolicitud(0, 530, 140, 3, false, yearsToQuery34);
    }, 10000);



    setTimeout(function () {
        realizarSolicitud(0, 532, 140, 1, false, yearsToQuery35);
    }, 6000);

    setTimeout(function () {
        realizarSolicitud(0, 532, 140, 2, false, yearsToQuery35);
    }, 8000);

    setTimeout(function () {
        realizarSolicitud(0, 532, 140, 3, false, yearsToQuery35);
    }, 10000);



    setTimeout(function () {
        realizarSolicitud(0, 548, 140, 1, false, yearsToQuery36);
    }, 6000);

    setTimeout(function () {
        realizarSolicitud(0, 548, 140, 2, false, yearsToQuery36);
    }, 8000);

    setTimeout(function () {
        realizarSolicitud(0, 548, 140, 3, false, yearsToQuery36);
    }, 10000);



    setTimeout(function () {
        realizarSolicitud(0, 543, 140, 1, false, yearsToQuery37);
    }, 6000);

    setTimeout(function () {
        realizarSolicitud(0, 543, 140, 2, false, yearsToQuery37);
    }, 8000);

    setTimeout(function () {
        realizarSolicitud(0, 543, 140, 3, false, yearsToQuery37);
    }, 10000);
}