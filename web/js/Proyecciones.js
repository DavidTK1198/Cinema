export var proyeccion;
export var proyecciones = [];
import {peliculas} from '../js/administrador.js'
import {salas} from '../js/administrador.js'

export function resetProyeccion(){
    proyeccion = {pelicula:{}, sala:{}, date:{},precio:0};
    $("#fecha").val("");
    $("#hora").val(0);
}
export function agregarProyeccion(){
    var nom = `${event.target.id}`;
    var c = nom.split("-RegProyeccion").join("");
    
    
    cargarDatos(c);
    if (!validarDatos()) {
        return;
    }
    $.ajax({
        type: "POST",
        url: "/Cinema/web/api/Proyecciones",
        data: JSON.stringify(proyeccion),
        contentType: "application/json"
        
    }).then((response) =>{
        mensaje();
        resetProyeccion();
       
    }, 
    (error) =>{
       console.log("fallo agregar proyeccion");
    });
    
    
    
}

export function listarProyecciones(ay){
     $.ajax({
        type: "GET",
        url: "/Cinema/web/api/Proyecciones/"+ay,
        contentType: "application/json"
      
    }).then((response) =>{
        console.log(response);
        proyecciones = [...response];
        console.log(proyecciones);
        console.log("-");
        console.log(ay);
        console.log("-------------");
       
    }, 
    (error) =>{
       console.log("fallo listar proyecciones");
        console.log(",");
       console.log(ay);
    });
    
    
    
}
function mensaje(){
    alert("La proyeccion relacionada a la pelicula " + proyeccion.pelicula.nombre+ " ha sido correctamente ingresada");
}
function cargarDatos(c){
    
    var peli = peliculas.find(p=>p.nombre == c);
    var s = $("#sele").val();
    var sala = salas.find(p=>p.codigo == s);
        
    
    proyeccion = {
      pelicula : peli,
      sala: sala,
      date: formatofecha($("#fecha").val(),$("#hora").val()),
      precio: $("#precio").val()
  
    };
  }
function formatofecha(fecha,hora){
  
      var fe = fecha +"T"+hora;
      var dat = new Date(fe);
      return dat;
}

function validarDatos(){
    var hora = $("#hora");
    var fec = $("#fecha");
    var error = false;
    if(hora.length == 0){
        hora.classList.add("invalid");
        error = true;
    }
    if(fec.length == 0){
        fec.classList.add("invalid");
        error = true;
    }
    return !error;
}
