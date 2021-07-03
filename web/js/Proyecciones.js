export var proyeccion = {pelicula: {}, sala: {}, date: {}, precio: 0};
export var proyecciones = [];
export var fecha = "";
import {peliculas} from "../js/peliculas.js"
        import {salas} from './draw.js'

        export function resetProyeccion() {
            proyeccion = {pelicula: {}, sala: {}, date: {}, precio: 0};
            $("#fecha").val("");
            $("#hora").val(0);
        }
export function agregarProyeccion() {
    var nom = `${event.target.id}`;
    var c = nom.split("-RegProyeccion").join("");
    var segunda = c.split("-").join(" ");

    cargarDatos(segunda);
    $.ajax({
        type: "POST",
        url: "/Cinema/web/api/Proyecciones",
        data: JSON.stringify(proyeccion),
        contentType: "application/json"

    }).then((response) => {
        mensaje();
        resetProyeccion();

    },
            (error) => {
    });



}

export function listarProyecciones(ay) {

    return new Promise(function (sol, rechazo) {
        $.ajax({
            type: "GET",
            url: "/Cinema/web/api/Proyecciones/" + ay,
            contentType: "application/json"

        }).then((response) => {

            proyecciones = [...response];
            proyecciones.forEach((w) => {
               
            });
            sol("ok");
        },
                (error) => {
            rechazo("error");
        });


    });

}

export function format(fe) {
    var nueva = "";
    var contador = 0;
    var i;
    fecha = "";
    for (i = 0; i < fe.length; i++) {
        if (fe[i] == ":") {
            contador++;
        }
        if (contador == 2) {
            break;
        }
        if (fe[i] != "T") {
            fecha = fecha + fe[i];
        } else {
            fecha = fecha + " ";
        }
        nueva = nueva + fe[i];

    }
    return new Date(nueva);
}
function mensaje() {
    alert("La proyeccion relacionada a la pelicula " + proyeccion.pelicula.nombre + " ha sido correctamente ingresada");
}
function cargarDatos(c) {

    var peli = peliculas.find(p => p.nombre == c);
    var nom = peli.nombre;
    var zz = nom.split(" ").join("-");
    var s = $("#sele").val();
    var sala = salas.find(p => p.codigo == s);
    var fec = document.getElementsByName(`fecha-${zz}`);
    var hor = document.getElementsByName(`hora-${zz}`);
    var pre = document.getElementsByName(`precio-${zz}`);
    proyeccion = {
        pelicula: peli,
        sala: sala,
        date: formatofecha(fec[0].value, hor[0].value),
        precio: pre[0].value

    };
}
function formatofecha(fecha, hora) {

    var fe = fecha + "T" + hora;
    var dat = new Date(fe);
    return dat;
}

function validarDatos() {
    //var hora = $("#hora");
    //var fec = $("#fecha");
    //var error = false;
    //if (hora.length == 0) {
      // hora.classList.add("invalid");
        //error = true;
    //}
    //if (fec.length == 0) {
        //fec.classList.add("invalid");
        //error = true;
   // }
    //return !error;
}
