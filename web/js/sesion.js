export var data = {
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
"use strict";
function reset() {
    data = { idUsu: '', clave: '', nombre: '', rol: 0 };
    var m = document.getElementById("cedula");
    var r = document.getElementById("nombre");
    var b = document.getElementById("contra");
    m.value = "";
    r.value = "";
    b.value = "";
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
export function login() {
     var a = document.getElementById("cedulaa");
     var contraseña = document.getElementById("contraa");
    
     
    load(false);
    if (!validar(false))
        return;
    $.ajax({
        type: "POST",
        url: "/Cinema/web/api/usuarios/login",
        data: JSON.stringify(data),
        contentType: "application/json"
    }).then((response) => {
        sessionStorage.setItem('user', JSON.stringify(response));
        switch(response.rol){
            case 1: location.href = "/Cinema/web/presentation/administrador.html";
                break;
            case 2:location.href = "/Cinema/web/presentation/cliente.html";
                break;
        }
       
    },
        (error) => {
            a.classList.add("invalid");
            contraseña.classList.add("invalid");
            
            return;
        });
}
export function logout() {
    $.ajax({
        type: "DELETE",
        url: "/Cinema/web/api/usuarios",
    }).then((response) => {
        sessionStorage.removeItem('user');
        window.location.href = "/Cinema/web/";
    },
        (error) => {
            
        });
}

export function getCurrentUser() {
    data=JSON.parse(sessionStorage.getItem("user"));
    setUsu(data.idUsu, data.clave, data.nombre, data.rol);
    document.getElementById('navbarDropdown').textContent = `${data.nombre}`;
    document.getElementById('usu').textContent =  `Bienvenido  ${data.nombre}`;
 }
 function setUsu(id, clav, nomb, ro) {
    data = {idUsu: id, clave: clav, nombre: nomb, rol: ro};
}
 
export function registro() {
     var a = document.getElementById("cedula");
     var contraseña = document.getElementById("contra");
     var nom = document.getElementById("nombre");
    load(true);
    if (!validar(true))
        return;
    $.ajax({
        type: "POST",
        url: "/Cinema/web/api/usuarios",
        data: JSON.stringify(data),
        contentType: "application/json"
    }).then((response) => {
        alert("Registro completado exitosamente");
        reset();
        
    },
        (error) => {
            a.classList.add("invalid");
            contraseña.classList.add("invalid");
            nom.classList.add("invalid");
            return;
        });
}



