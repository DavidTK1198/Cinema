"use strict";
var usuario;
function setUsu(id, clav, nomb, ro) {
    usuario = {idUsu: id, clave: clav, nombre: nomb, rol: ro};
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