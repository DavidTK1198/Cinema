export var pelicula;
"use strict";
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
    imagenData.append("Peli", pelicula.nombre);
    imagenData.append("imagen", $("#imagen").get(0).files[0]);
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
       
        
         
        
    },
            (error) => {
        console.log("fallo pelicula");

    });
    


}