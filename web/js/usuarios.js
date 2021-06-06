"use strict";
var data = {
    /*  Esta variable guarda la  id del usuario.
     *  Se actualiza de manera automática.
     */
    idUsu: '',
    /*  Esta variable guarda la contraseña del usuario.
     *  Se actualiza de manera automática.
     */
    clave: '',

    /*  Esta variable guarda el nombre del usuario.
     *  Se actualiza de manera automática.
     */
    nombre: '',

    rol: 0

            /*  Esta variable guarda el rol del usuario.
             *  Se actualiza de manera automática.
             */
};
function reset() {
    data = {idUsu: '', clave: '', nombre: '', rol: 0};
}
function setUsu(id,clav,nomb, ro){
    data = {idUsu: id, clave: clav, nombre: nomb, rol:ro};
}

function load(bandera) {
    if (bandera) {
        data = {
            idUsu: document.getElementById("cedula").value,
            nombre: document.getElementById("nombre").value,
            clave: document.getElementById("contra").value,
            rol: 2
        };
    } else {
        data = {
            idUsu: document.getElementById("cedulaa").value,
            clave: document.getElementById("contraa").value
        };
    }
}

function validar(bandera) {
    var contraseña = document.getElementById("contra");
    var error = false;
    var cedula = document.getElementById("cedula");
    if (data.clave.length == 0) {
        contraseña.classList.add("invalid");
        error = true;
    }
    cedula.classList.remove("invalid");
    if (data.idUsu.length == 0) {
        cedula.classList.add("invalid");
        error = true;
    }
    if (bandera) {
        var nombre = document.getElementById("nombre");
        nombre.classList.remove("invalid");
        if (data.nombre.length == 0) {
            nombre.classList.add("invalid");
            error = true;
        }
    }
    return !error;
}
function login() {
    load(false);
    if (!validar(false))
        return;
    $.ajax({
        type: "POST",
        url: "/Cinema/web/api/usuarios/login",
        data: JSON.stringify(data),
        contentType: "application/json"
    }).then((response) => {
        setUsu(response.idUsu, response.clave, response.nombre, response.rol);
        switch(response.rol){
            case 1: 
                location.href = "/Cinema/web/presentation/administrador.html";
                
                break;
            case 2: location.href = "/Cinema/web/presentation/cliente.html";
                break;
                
            
        }
        
    },
            (error) => {
        console.log(error);
    });
}
function registro() {
     load(true);
    if (!validar(true))
        return;
    $.ajax({
        type: "POST",
        url: "/Cinema/web/api/usuarios",
        data: JSON.stringify(data),
        contentType: "application/json"
    }).then((response) => {
       
        
    },
            (error) => {
        console.log(error);
    });
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

function draw_home() {
    $("#cambiar").show();
    $("#barra").show();
    $("#change").remove();
}
function loaded() {
    $("#loginButton").click(login);
    $("#RegButton").click(registro);
    $("#pelicula").click(draw_movie);
    $("#home").click(draw_home);
}
$(loaded);


