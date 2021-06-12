

export var compra;
import {total} from "../js/administrador.js"
export var x = [];
import {crearTiquete,tiquetes} from "../js/tiquetes.js"
        import {proyeccion} from "../js/Proyecciones.js"
        "use strict";

function resetCompra() {
    compra = {p: {}, user: {}, total: 0.0, codigo: "", tiquetes: []};

}


function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
export function cargarCompra() {
    var x = location.href;
    if (x != "/Cinema/web/presentation/cliente.html") {
        var a = document.getElementById("mal");
        a.classList.remove("d-none");
        a.classList.add("d-block");




    }




}
export async function agregarCompra() {
    var bandera = false;
    var p = new Promise(function (sol, rechazo) {
        cargarObjeto(1);
        
        $.ajax({
            type: "POST",
            url: "/Cinema/web/api/Compras",
            data: JSON.stringify(compra),
            contentType: "application/json"

        }).then((response) => {

            console.log("si hizo la compra");
            bandera = true;
            sol("ok");

        },
                (error) => {
            console.log("fallo Compra");
            rechazo("F");
        });

    });
    await p;
    if (bandera == true) {
        await crearTiquete();
        resetCompra();
    }
}
function cargarObjeto(valor) {


    switch (valor) {
        case 1:
            compra = {
                p: proyeccion,
                user: {idUsu: document.getElementById("cedula2").value, clave: '', nombre: '', rol: 3},
                total: total,
                codigo: makeid(5),
                tiquetes: []
            };
            break;

    }
}
export function devuelveTiquetes(){
    
    return new Promise(function(sol,rechazo){
    $.ajax({
        type: "POST",
        url: "/Cinema/web/api/Compras/listarT",
        data: JSON.stringify(proyeccion),
        contentType: "application/json"
    }).then((response) => {
        x= [...response];
        
        
        
        sol("ok");
    },
            (error) => {
        console.log("fallo listar");
        console.log(error.text);
        rechazo("error");

    });
});

    
    
}
export function generarPdfCompras(com){
    
      
    $.ajax({
        type: "GET",
        url: "/Cinema/web/api/Compras/"+com.codigo+"/pdf"
       
    }).then((response) => {
       window.location = "datalle.pdf";
       
       
       
        
        
       
    },
            (error) => {
        console.log("fallo generacion de pfg");
        console.log(error.text);
       

    });

    
}
