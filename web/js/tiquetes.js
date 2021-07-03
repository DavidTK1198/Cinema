"use strict";

import {compra,generarPdfCompras} from "../js/compras.js"
export var tiquete;

export var tiquetes = [];
function restartTiquete(){
    tiquete = {fila: 0, col:0, compra:{}};
}

export function crearTiquete(){
     return new Promise(function(sol,rechazo){
    var butacas = document.getElementsByClassName("selected");
    var id = "";
    
    var fil =0;
    var col=0;
    for(var i = 1; i < butacas.length; i++){
        var item = butacas[i];
        id = item.id;
        var ayuda2 = id.split(",").join("");
        fil = Number.parseInt(ayuda2[0]);
        col =  Number.parseInt(ayuda2[1]);
        rellenarObjeto(fil,col);
       
    }
    mandarTiquetes();
    generarPdfCompras(compra);
    sol("ok");
    rechazo("error");
     }
     );
   
}
function rellenarObjeto(f,c){
    tiquete = {
        fila: f,
        col:c, 
        compra:compra
        
    };
    tiquetes.push(tiquete);
}
function mandarTiquetes(){
        
         $.ajax({
        type: "POST",
        url: "/Cinema/web/api/Compras/tiquetes",
        data: JSON.stringify(tiquetes),
        contentType: "application/json"

    }).then((response) => {
         tiquetes = [];
         $("#exampleModal").modal("toggle");
    },
            (error) => {
    });
}
