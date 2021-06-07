"use strict";
var usuario;
var peliculas = [];
function setUsu(id, clav, nomb, ro) {
    usuario = {idUsu: id, clave: clav, nombre: nomb, rol: ro};
}
function draw_movie() {
    $("#cambiar").hide();
    $("#barra").hide();

    try {
        let bandera = !!document.getElementById("change");
        throw bandera;
    } catch (error) {
        if (!error) {
            var contenedor = document.getElementById("content");
            var fila = document.createElement("div");
            fila.classList.add("text-black", "row", "justify-content-center");
            contenedor.appendChild(fila);
            contenedor.classList.add("text-black", "justify-content-center");
            var d = document.createElement("div");
            d.id = 'change';
            d.classList.add("col", "col-sm-8", "col-md-4", "col-xl-4", "d-flex");
            d.innerHTML = (`<div class="d-flex">
    <form> 
    <h3>Registrar Pelicula</h2>
    <div class="mb-2">
        <div class="font-weight-bold mb-0">Nombre</div>
        <div class="campo"><input class="form-control" placeholder="Nombre de la Pelicula" type="text" name="cedulaFld" id="nombP"></div>
    </div>
    <div class="mb-2">
    <div>
        <label>Estado de la Pelicula</label>
        <div id="flex">
            <div>
                <input type="radio" name="oferta" value="1" checked>Pelicula en Cartelera
            </div>
        </div>

        <div id="flex">
            <div>
                <input type="radio" name="oferta" value="0">Proximamente
            </div>
        </div>
    </div>
         <div class="form-group" style="margin-left: 10px; margin-right: 10px;">
        <label for="imagen">Imagen</label>
        <input type="file" accept="image/*" class="form-control" name="imagen" id="imagen" placeholder="Imagen" val="">
       </div>
</div>
    <input type="button" value="Registrar" class="btn btn-danger" id="RegPeli">
      
</form>
       
</div>`
                    );
            fila.appendChild(d);
            $("#RegPeli").click(mandarAgregarP);

        }
    }
}
function getCurrentUser() {
    $.ajax({
        type: "GET",
        url: "/Cinema/web/api/usuarios",
        contentType: "application/json"
    }).then(
            (response) => {
        setUsu(response.idUsu, response.clave, response.nombre, response.rol);
        document.getElementById('navbarDropdown').textContent = `${response.nombre}`;
        document.getElementById('usu').textContent = ` Bienvenido ${response.nombre}`;
    },
            (error) => {

    }
    );
}

function draw_home() {
    $("#cambiar").show();
    $("#barra").show();
    $("#change").remove();
}

function loaded() {
    $("#pelicula").click(draw_movie);
    $("#home").click(draw_home);


    recuperarPeliculas();
    //getCurrentUser();
}
function mandarAgregarP() {

    agregarPelicula();
}
$(loaded);
var pelicula;
"use strict";
var url = "http://localhost:8080/Cinema/web/";
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


function agregarPelicula() {
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
        // prueba();


    },
            (error) => {
        console.log("fallo pelicula");
        console.log(error.text);

    });

}
function recuperarPeliculas() {

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