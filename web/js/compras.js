

export var compra;
import {total} from "../js/administrador.js"
        import {proyeccion} from "../js/Proyecciones.js"
        "use strict";

function resetCompra() {
    compra = {p: {}, user: {}, total: 0.0, codigo: "", tiquetes: []};

}
function comprar() {





}
export function cargarCompra() {
    var x = location.href;
    if (x != "/Cinema/web/presentation/cliente.html") {
        var a = document.getElementById("mal");
        a.classList.remove("d-none");
        a.classList.add("d-block");
        cargarObjeto(1);
        
        

    }




}
export function agregarCompra(){
     $.ajax({
        type: "POST",
        url: "/Cinema/web/api/Compras",
        data: JSON.stringify(compra),
        contentType: "application/json"

    }).then((response) => {
        mensaje();
        resetCompra();

    },
            (error) => {
        console.log("fallo Compra");
    });
}
function cargarObjeto(valor){
   
    
    switch(valor){
        case 1: 
            compra = {
            p: proyeccion,
            user: {idUsu: document.getElementById("cedula2").value, clave: '', nombre: '', rol: 3},
            total: total,
            codigo: "",
            tiquetes: []
            };
        break;
        
    }
}
