import {errorMessage} from "../js/draw.js"
export var sala;

function resetSala() {
    sala = {codigo: "", fila: 0, col: 0};
    $("#sala").val("");
    $("#fila").val(0);
    $("#columna").val(0);
}

export function agregarSala() {
    cargar();
    if (!validarDatos()) {
        return;
    }
    $.ajax({
        type: "POST",
        url: "/Cinema/web/api/Salas",
        data: JSON.stringify(sala),
        contentType: "application/json"
    }).then((response) => {
        salaAgregadaCorrectamente();
        resetSala();

    },
            (error) => {
       
        errorMessage(error.status,$("#content #errorDiv"),"Sala");
        console.log("Fallo el ingreso de sala");
        return;

    });
}
function salaAgregadaCorrectamente() {
    alert("La sala con el codigo " + sala.codigo + " ha sido agregado correctamente");
}
function validarDatos() {
    var nom = document.getElementById("sala");
    var fila = document.getElementById("fila");
    var colu = document.getElementById("columna");
    var error = false;
    if (nom.length == 0) {

        nom.classList.add("invalid");
        error = true;
    }
    if (Number.isInteger(fila.value)) {
        fila.classList.add("invalid");
        error = true;
    }
    if (Number.isInteger(colu.value)) {
        colu.classList.add("invalid");
        error = true;
    }
    return !error;

}
function cargar() {
    sala = {
        codigo: document.getElementById("sala").value,
        fila: Number.parseInt(document.getElementById("fila").value, 10),
        col: Number.parseInt(document.getElementById("columna").value, 10)
    };

}
