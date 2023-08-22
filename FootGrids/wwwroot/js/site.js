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
                                     '<input type="text" id="input-busq-jug" placeholder="Introduzca el nombre del jugador oculto..." value="" class="input-busq-jug rounded fuentePrincipal colorFuenteTerciaria" style="width: 100%" />' + 
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