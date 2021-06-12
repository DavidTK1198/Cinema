
import { sala } from "../js/Salas.js"
import { agregarSala } from "../js/Salas.js"
import { proyeccion, agregarProyeccion, proyecciones, listarProyecciones, fecha, format} from "../js/Proyecciones.js"
import {agregarPelicula, cargarPeliculas, recuperarPeliculas, peliculas, url} from "../js/peliculas.js"
import {cargarCompra,agregarCompra} from "../js/compras.js"
"use strict";
var usuario;
export var total;
export var salas = [];
function setUsu(id, clav, nomb, ro) {
    usuario = {idUsu: id, clave: clav, nombre: nomb, rol: ro};
}
function draw_movie() {
    $("#cambiar").hide();
    $("#barra").hide();
    $("#change").remove();

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
    <form> 
    <h3 class="mt-5">Registrar Pelicula</h2>
    <div class="mb-2">
        <div class="font-weight-bold mb-0">Nombre</div>
        <div class="campo"><input class="form-control" placeholder="Nombre de la Pelicula" type="text" name="cedulaFld" id="nombP"></div>
    </div>
    <div class="mb-2">
    <div>
        <label>Estado de la Pelicula</label>
        <div id="flex">
            <div>
                <input type="radio" name="oferta" value="1" checked>Pelicula en Cartelera
            </div>
        </div>

        <div id="flex">
            <div>
                <input type="radio" name="oferta" value="0">Proximamente
            </div>
        </div>
        <div class="embed-responsive embed-responsive-16by9 d-none" id="hnone">
        <img src="" class="card-img-top embed-responsive-item" alt="..." id="prueba">
    </div>
    </div>
         <div class="form-group" style="margin-left: 10px; margin-right: 10px;">
        <label for="imagenl">Imagen</label>
        <input type="file" accept="image/*" class="form-control"  id="imagen" placeholder="Imagen" val="">
       </div>
</div>
    <input type="button" value="Registrar" class="btn btn-danger" id="RegPeli">
      
</form>
       
</div>`
                    );
            fila.appendChild(d);
            $("#RegPeli").click(mandarAgregarP);
            document.getElementById("imagen").addEventListener("change", () => {
                var file = $("#imagen").get(0).files[0];
                var img = document.getElementById("prueba");
                img.src = window.URL.createObjectURL(file);
                img = document.getElementById("hnone");
                img.classList.remove("d-none");
                img.classList.add("d-block");
            });
        }
    }
}

function drawSala() {
    $("#cambiar").hide();
    $("#barra").hide();
    $("#change").remove();

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
    <form> 
    <h3>Registrar Sala</h2>
    <div class="mb-2">
        <div class="font-weight-bold mb-0">Codigo</div>
        <div class="campo"><input class="form-control" placeholder="Codigo de la sala" type="text" name="salaFld" id="sala"></div>
    </div>
        <div class="mb-2">
        <div class="font-weight-bold mb-0">Filas</div>
        <div class="campo"><input class="form-control" placeholder="# de filas" type="number" name="filaFld" id="fila" min=1 max=20></div>
    </div>
       
        <div class="mb-2">
        <div class="font-weight-bold mb-0">Columnas</div>
        <div class="campo"><input class="form-control" placeholder="# de columnas" type="number" name="columnaFld" id="columna" min=1 max=20></div>
    </div>
   
    <input type="button" value="Registrar" class="btn btn-danger" id="RegSala">
      
</form>
       
</div>`
                    );
            fila.appendChild(d);
            $("#RegSala").click(agregarSala);

        }
    }
}
function drawProyeccion() {
    $("#cambiar").hide();
    $("#barra").hide();
    $("#change").remove();
    recuperarSalas();
    var ban = false;
    try {
        let bandera = !!document.getElementById("change");
        throw bandera;
    } catch (error) {
        if (!error) {
            var contenedor = document.getElementById("content");
            var container = document.createElement("div");
            var fila = document.createElement("div");
            var h = document.createElement("h2");
            h.classList.add("ml-5", "mt-5");
            h.textContent = "Peliculas Disponibles"
            container.appendChild(h);
            h = document.createElement("br");
            container.appendChild(h);
            fila.classList.add("text-black", "row", "justify-content-center", "mt-5");
            contenedor.classList.add("text-black", "justify-content-center");
            container.appendChild(fila);
            container.id = "change";
            contenedor.appendChild(container);
            container.classList.add("text-black", "justify-content-center");

            if (peliculas.length == 0) {
                fila.innerHTML = (`<span id="mensaje">NO EXISTEN PELICULAS DISPONIBLES PARA AGREGAR PROYECCION</span>`);
            } else {

                $("#mensaje").remove();
                peliculas.forEach((p) => {
                    let name = p.nombre.split(" ").join("-");
                    var nueva = document.createElement("div");
                    nueva.id = "colums";
                    nueva.classList.add("col", "col-sm-8", "col-md-4", "col-xl-4", "mb-5", "border-dark", "ml-2");
                    nueva.innerHTML = (
                            `
                <div class="card">
                <div class="embed-responsive embed-responsive-16by9" id="zoom">
                <img src="${url}api/Peliculas/${p.nombre}/imagen" class="card-img-top embed-responsive-item" alt="..." id="${name}" data-toggle="modal" data-target="#staticBackdrop2">
            </div>
            <div class="card-body border justify-content-center">
           
            <p class="card-text text-black" >
                  ${p.nombre}
            </p>
          </div>
            </div>
                <div class="modal fade signup-form" id="staticBackdrop2" data-backdrop="static" data-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="staticBackdropLabel">AGREGAR PROYECCION</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="signup-form">
                    <form>
                    <h2>Registro de Proyecciones</h2>
                    <h2 id="nameP" class="d-none"></h2>
                        <div class="form-group" id="s">
                    <p>Elegir sala</p>
                    
                        </div>
                        <div class="form-group">
                        <input type="date" class="form-control" name="fecha" id="fecha" placeholder="fecha" required="required">
                    </div> 
                    <div class="form-group">
                    <input type="time" class="form-control" name="fecha" id="hora" placeholder="fecha" required="required">
                </div> 
                    <div class="form-group">
                            <input type="number" class="form-control" name="precio" id="precio" placeholder="Precio" required="required" min=0 max=200000>
                        </div> 
                    <div class="form-group">
			<input type="button" class="btn btn-success btn-lg btn-block" id="${name}-RegProyeccion" value="Registrar Proyeccion">
                        </div>
                    </form>
                </div>
                </div>
              </div>
            </div>
          </div>
        
        </div>
      </div>`
                            );
                    let nombre = p.nombre.split(" ").join("-");
                    fila.appendChild(nueva);

                    $(`#${nombre}`).click(listarSalas);

                    $(`#${name}-RegProyeccion`).click(agregarProyeccion);


                });

            }
        }
    }
}
function listarSalas() {
    recuperarSalas();
    var contador = 0;
    var ayuda = document.getElementById("s");
    if (salas.length == 0) {
        ayuda.innerHTML = (`<span id="men">No hay salas disponibles</span>`);
    } else {
        $("#men").remove();
        $("#sele").remove();
        var nueva = document.createElement("div");
        nueva.classList.add("select", "text-black");
        var select = document.createElement("select");
        select.classList.add("text-black");
        select.id = "sele";
        salas.forEach((s) => {
            contador++;
            var nuev = document.createElement("option");
            nuev.value = `${s.codigo}`;
            nuev.textContent = `${s.codigo}`;
            if (contador == 1) {
                nuev.selected = "selected";
            }
            select.appendChild(nuev);
        });
        nueva.appendChild(select);
        ayuda.appendChild(nueva);
        nueva = document.getElementById("nameP");
        nueva.textContent = `${event.target.id}`;
        nueva.classList.remove("d-none");
        nueva.classList.add("d-block");

    }

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

function draw_home() {
    $("#cambiar").show();
    $("#barra").show();
    $("#change").remove();
}

async function loaded() {
    $("#pelicula").click(draw_movie);
    $("#home").click(draw_home);
    $("#salita").click(drawSala);
    $("#proyeccion").click(drawProyeccion);
    await recuperarPeliculas();
    getCurrentUser();
}
function mandarAgregarP() {

    agregarPelicula();
    recuperarPeliculas();
}
$(loaded);

function recuperarSalas() {
    return new Promise(function (sol, rechazo) {
        $.ajax({
            type: "GET",
            url: "/Cinema/web/api/Salas/listar"
        }).then((response) => {
            salas = [...response];
            console.log("????");
            sol("ok");
        },
                (error) => {
            console.log("fallo listar");
            console.log(error.text);
            rechazo("error");
        });


    })

}


export async function proyeccionesApeliculas(nom) {
    var ayuda = document.getElementById(`${nom}`);
    var pel = nom.split("-pro").join("");
    var x = await listarProyecciones(pel);
    console.log("Administrador");
    console.log(proyecciones);
    console.log(nom);
    console.log("-----------------");
    if (proyecciones.length == 0) {
        ayuda.innerHTML = (`<span id="nop">No hay proyecciones disponibles</span>`);
    } else {
        $("#nop").remove();
        proyecciones.forEach((p) => {
            var nueva = document.createElement("div");

           
            var ayuda2 = fecha.split(" ").join("");
            
            nueva.id = `${ayuda2}/${p.sala.codigo}`;
            nueva.textContent = `${fecha}/${p.sala.codigo}`;
            nueva.classList.add("pointer");

            nueva.addEventListener("click", sillas);
            ayuda.appendChild(nueva);
        }
        );
    }

}
function sillas() {
    var n = document.createElement("div");
    var sala = event.target.id;
    n.id = "del-comp";
    $("#del-comp").remove();
    var nue = document.getElementById("tarjeta");
    n.innerHTML = (` 
      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Comprar boletos</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="loginButton">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="container justify-content-center">
                <ul class="showcase">
                  <li>
                    <div id="seat" class="seat"></div>
                    <small class="status" style="font-size: 1em;">N/A</small>
                  </li>
                  <li>
                    <div id="seat" class="seat selected"></div>
                    <small class="status" style="font-size: 1em;">Selected</small>
                  </li>
                  <li>
                    <div id="seat" class="seat occupied"></div>
                    <small class="status" style="font-size: 1em;">Occupied</small>
                  </li>
                </ul>
                <div class="w-50 move" id="asientos" >
                  <div class="screen"></div>
                 
                  </div>
                </div>
            </div>
            <p class="text" style="font-size: 1em;margin:0px 0px 15px 0px">
                Ha seleccionado <span id="count">0</span> butacas por el precio de $<span id="total">0</span>
                    
            </p>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" id="comprar">Comprar</button>
            </div>
            
          </div>
    
        </div>
               <div class="signup-form d-none" id ="mal">
                      <form>
                        <h2>Datos requeridos para efectuar la compra</h2>
                        <div class="input-group form-group mt-5">
                          <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-user"></i></span>
                          </div>
                          <input type="text" class="form-control" placeholder="cedula de identidad" required id="cedula2">
                          
                        </div>
                        <div class="input-group form-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-key"></i></span>
                          </div>
                          <input type="text" class="form-control" placeholder="Tarjeta" required id="tarjeta" pattern="[0-9\s]{13,19}">
                        </div>
                        <div class="d-flex justify-content-center">
                          <input type="button" value="Comprar Tiquetes" class="btn btn-danger" id="compraButton">
                        </div>
                      </form>
                
                  </div>
      </div>
       



                    `);
    nue.appendChild(n);
    filasYcolumnas(sala);
    $("#compraButton").click(agregarCompra);

    $("#exampleModal").modal();


}
async function filasYcolumnas(sa) {
    var f = 0;
    var fechita = "";
    var salaaa = "";
    var bandera = false;
    await recuperarSalas();
    var contador = 1;
    for (f; f < sa.length; f++) {
        if (sa[f - 1] == "/" || bandera == true) {
            salaaa = salaaa + sa[f];
            bandera = true;
        }
        if(contador == 11){
            fechita = fechita + "T";
        }
        if(bandera == false && sa[f] != "/"){
            fechita = fechita + sa[f];
        }
        
        contador++;
    }
    var dat = new Date(fechita);
    var hijo = document.getElementById(`${sa}`);
    var padre = hijo.parentElement;
    var idd = padre.id;
    var p = idd.split("-pro").join("");
    await listarProyecciones(p);
    var proye = proyecciones.find(z => z.date.toString() == dat.toString());
    proyeccion.pelicula = proye.pelicula;
    proyeccion.sala = proye.sala;
    proyeccion.date = proye.date;
    proyeccion.precio = proye.precio;
    var nu = salas.find(p => p.codigo == salaaa);
    if (nu != undefined) {
        var asi = document.getElementById("asientos");
        var i, j = 0;

        for (i = 0; i < nu.fila; i++) {
            var rows = document.createElement("div");
            rows.classList.add("row", "pl-4", "justify-content-center", "d-flex");
            for (j = 0; j < nu.col; j++) {
                var columns = document.createElement("div");
                columns.id = `${i},${j}`;
                columns.classList.add("seat");
                rows.appendChild(columns);
            }
            asi.appendChild(rows);
        }
        var count = 0;
        var seats = document.getElementsByClassName("seat");
        for (var i = 0; i < seats.length; i++) {
            var item = seats[i];

            item.addEventListener("click", (event) => {
                if (!event.target.classList.contains('occupied') && !event.target.classList.contains('selected')) {
                    count++;
                    total = count * proyeccion.precio;
                    event.target.classList.add("selected");
                    document.getElementById("count").innerText = count;
                    document.getElementById("total").innerText = total;

                }else if(!event.target.classList.contains('occupied') && event.target.classList.contains('selected')){
                    count--;
                    total = count * proyeccion.precio;
                    event.target.classList.remove("selected");
                    document.getElementById("count").innerText = count;
                    document.getElementById("total").innerText = total;
                }
                    
                
            });
        }
        $("#comprar").click(cargarCompra);
        

    }

}
function sinCredenciales(){
    
}