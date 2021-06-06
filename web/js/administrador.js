"use strict";
var usuario;
function setUsu(id,clav,nomb, ro){
    usuario = {idUsu: id, clave: clav, nombre: nomb, rol:ro};
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
    <form  class="text-black mt-5" name="form"  method="post" > 
    <h3>Registrar Pelicula</h2>
    <div class="mb-2">
        <div class="font-weight-bold mb-0">Nombre</div>
        <div class="campo"><input class="form-control" placeholder="Nombre de la Pelicula" type="text" name="cedulaFld"></div>
    </div>
    <div class="mb-2">
        <div class="font-weight-bold mb-0">Nombre</div>
        <div class="campo"><input class="form-control" placeholder="Poner estado tarea" type="text" name="NombreFld"></div>
    </div>
    <div class="mb-2">
    <div class="flex-container">
        <label>Estado de la Pelicula</label>
        <div id="flex">
            <div class="flex-item">
                <input type="radio" name="oferta" value="1" checked>Pelicula en Cartelera
            </div>
        </div>

        <div id="flex">
            <div class="flex-item">
                <input type="radio" name="oferta" value="0">Proximamente
            </div>
        </div>
    </div>
</div>
    <button class="btn btn-success btn-lg btn-block">Registrar</button>
</form>
</div>`
                    );
            fila.appendChild(d);
        }
    }
}
function getCurrentUser(){
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
    getCurrentUser();
}
$(loaded);