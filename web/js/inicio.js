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
        switch(response.rol){
            case 1: 
                window.location.href = "/Cinema/web/presentation/administrador.html";
                break;
            case 2: location.href = "/Cinema/web/presentation/cliente.html";
                break
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

function loaded() {
    $("#loginButton").click(login);
    $("#RegButton").click(registro);
}

$(loaded);


