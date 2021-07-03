import {proyeccionesApeliculas, inicio_Admin, opciones,errorMessage} from "../js/draw.js"
        import { listarComprasCliente, compras,compra} from "../js/compras.js"
        import {data} from "../js/sesion.js"
        export var peliculas = [];
"use strict";
export var pelicula;
export var url = "http://localhost:8080/Cinema/web/";
function resetPelicula() {
    pelicula = {nombre: '', estado: false};
}
export function setPelicula(nom, estad) {
    pelicula = {nombre: nom, estado: estad};
}
function reinicioCamposPelicula() {
    $("#nombP").val("");
    $("#imagen").val("");
}
function validarDatos() {
    var nom = document.getElementById("nombP");
    var error = false;
    if (pelicula.nombre.length == 0) {
        nom.classList.add("invalid");
        error = true;
    }else{
        nom.classList.remove("invalid");
    }
    return !error;

}
function cargar() {
    pelicula = {
        nombre: document.getElementById("nombP").value,
        estado: (document.querySelector("input[name='oferta']:checked")) ?
                document.querySelector("input[name='oferta']:checked").value : ""

    };
    if (pelicula.estado == 1) {
        pelicula.estado = true;
    } else {
        pelicula.estado = false;
    }
}
function addImagen() {
    var imagenData = new FormData();
    imagenData.append("nombre", pelicula.nombre);
    var file = $("#imagen").get(0).files[0];
    imagenData.append("imagen", file);
    let request = new Request(url + 'api/Peliculas/' + pelicula.nombre + "/imagen", {method: 'POST', body: imagenData});
    (async () => {
        const response = await fetch(request);
        if (!response.ok) {
            return;
        }
    })();


}


export function agregarPelicula() {
    cargar();

    if (!validarDatos()) {
        return;
    }
    return new Promise(function(sol,rechazo){
        $.ajax({
            type: "POST",
            url: "/Cinema/web/api/Peliculas",
            data: JSON.stringify(pelicula),
            contentType: "application/json"
        }).then((response) => {
    
            addImagen();
            peliculaAgregadaCorrectamente();
            resetPelicula();
            reinicioCamposPelicula();
            sol("ok");
        },
                (error) => {
            errorMessage(error.status,$("#content #errorDiv"),"Pelicula");
            rechazo("error");
    
        });
    })
   

}
 
export function recuperarPeliculas() {
    return new Promise(function (sol, rechazo) {
        $.ajax({
            type: "GET",
            url: "/Cinema/web/api/Peliculas/listar"
        }).then((response) => {
            peliculas = [...response];
            sol("ok")
        },
                (error) => {
            rechazo("error");

        });
    });
}


export  function cambiarEstado() {
    return new Promise(function (sol, rechazo) {
        $.ajax({
            type: "PUT",
            url: "/Cinema/web/api/Peliculas",
            data: JSON.stringify(pelicula),
            contentType: "application/json"
        }).then((response) => {
            peliculas = [...response];
            sol("ok");
        },
                (error) => {
            rechazo("error");

        });
    });
}

export async function cargarPeliculas() {

    $("#delpelic").remove();
    var row = document.getElementById("lista");
    var doc = document.createElement("div");
    doc.classList.add("text-black", "row", "justify-content-center");
    doc.id = "delpelic";
    var contador = 0;
    row.appendChild(doc);
    if (peliculas.length == 0) {
        row.innerHTML = (`<span id="mensaje">NO EXISTEN PELICULAS DISPONIBLES</span>`);
    } else {

        $("#mensaje").remove();
        peliculas.forEach((p) => {
            if (p.estado == true) {
                var nueva = document.createElement("div");
                nueva.id = "colums";
                nueva.classList.add("col", "col-sm-8", "col-md-4", "col-xl-4", "mb-5", "border-dark", "ml-5");

                nueva.innerHTML = (
                        `
                <div class="card" id="tarjeta">
                <div class="embed-responsive embed-responsive-16by9" id="zoom">
                <img src="${url}api/Peliculas/${p.nombre}/imagen" class="card-img-top embed-responsive-item" alt="...">
            </div>
          <div class="card-body border justify-content-center" id="${p.nombre}-pro">
            
          </div>
        </div>
      </div>`
                        );

                doc.appendChild(nueva);
                proyeccionesApeliculas(`${p.nombre}-pro`);
            } else {

                contador++;

            }
        });

        if (contador == peliculas.length) {

            row.innerHTML = (`<span id="mensaje" class="h3 text-white text-center">NO EXISTEN PELICULAS DISPONIBLES</span>`);
            var z = document.getElementById("mensaje");
            if (location.pathname == opciones['cliente']) {
                z.classList.remove("text-white");
                z.classList.add("text-black");



            }
        }
        if (location.pathname == opciones['cliente']) {
            
           await  listarComprasCliente(data);
            var dom = document.getElementById("tot");
            var dom2 = document.getElementById("peliculosky");
            dom.textContent = `Precio: $${compras[0].total}`;
            dom2.textContent = `${compras[0].p.pelicula.nombre}`;
        }

    }
}
function peliculaAgregadaCorrectamente() {
    alert("La pelicula" + pelicula.nombre + " ha sido correctamente ingresada");

}

export function BuscarPeliculas(peli) {
    return new Promise(function (sol, rechazo) {
        $.ajax({
            type: "GET",
            url: "/Cinema/web/api/Peliculas/" + peli

        }).then((response) => {
            peliculas = [...response];
            sol("ok");
        },
                (error) => {
            rechazo("error");

        });



    });
}