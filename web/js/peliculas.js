export var  peliculas = [];
"use strict";
var pelicula;
 var url="http://localhost:8080/Cinema/";
function resetPelicula() {
    pelicula = {nombre: '', estado: false};
}
function setPelicula(nom, estad) {
    pelicula = {nombre: nom, estado: estad};
}

function validarDatos() {
    var nom = document.getElementById("nombP");
    var error = false;
    if (pelicula.nombre.length == 0) {
        nom.classList.add("invalid");
        error = true;
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
            console.log("fallo imagen");
            return;
        }
    })();


}


export function agregarPelicula() {
    cargar();

    if (!validarDatos()) {
        return;
    }
    $.ajax({
        type: "POST",
        url: "/Cinema/web/api/Peliculas",
        data: JSON.stringify(pelicula),
        contentType: "application/json"
    }).then((response) => {

        addImagen();
    },
            (error) => {
        console.log("fallo pelicula");
        console.log(error.text);

    });

}
export function recuperarPeliculas() {

    $.ajax({
        type: "GET",
        url: "/Cinema/web/api/Peliculas/listar",
    }).then((response) => {
        peliculas = [...response];
        cargarPeliculas();
    },
            (error) => {
        console.log("fallo listar");
        console.log(error.text);

    });
}

function cargarPeliculas() {

    var row = document.getElementById("lista");

    if (peliculas.length == 0) {
        row.innerHTML = (`<span id="mensaje">NO EXISTEN PELICULAS DISPONIBLES</span>`);
    } else {

        $("#mensaje").remove();
        peliculas.forEach((p) => {
            var nueva = document.createElement("div");
            nueva.id = "colums";
            nueva.classList.add("col", "col-sm-8", "col-md-4", "col-xl-4", "mb-5", "border-dark");
            nueva.innerHTML = (
                    `
                <div class="card">
                <div class="embed-responsive embed-responsive-16by9" id="zoom">
                <img src="${url}api/Peliculas/${p.nombre}/imagen" class="card-img-top embed-responsive-item" alt="...">
            </div>
          <div class="card-body border justify-content-center">
            <h5 class="card-title"> Nombre:</h5>
            <p class="card-text text-black" >
              Nombre:${p.nombre}
            </p>
          </div>
        </div>
      </div>`
                    );
            row.appendChild(nueva);
        });

    }

}