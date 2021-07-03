
import { sala } from "./Salas.js"
        import { agregarSala } from "./Salas.js"
        import { login, registro, logout, data, getCurrentUser } from "./sesion.js"
        import { proyeccion, agregarProyeccion, proyecciones, listarProyecciones, fecha, format } from "./Proyecciones.js"
        import { agregarPelicula, cargarPeliculas, recuperarPeliculas, peliculas, url, cambiarEstado, pelicula, setPelicula, BuscarPeliculas } from "./peliculas.js"
        import { cargarCompra, agregarCompra, devuelveTiquetes, x, compras, listarCompras, listarComprasCliente } from "./compras.js"
        "use strict";
export var total;
export var salas = [];
export const opciones = {
    'inicio': "/Cinema/web/",
    'admin': "/Cinema/web/presentation/administrador.html",
    'cliente': "/Cinema/web/presentation/cliente.html",
    'salir': "/Cinema/web/presentation/index.html"
}

function draw_compras() {
    $("#cambiar").hide();
    $("#barra").hide();
    $("#change").remove();

    try {
        let bandera = !!document.getElementById("change");
        throw bandera;
    } catch (error) {
        if (!error) {
            var contenedor = document.getElementById("content");
            var d = document.createElement("div");
            var n = document.createElement("div");
            contenedor.classList.add("d-flex", "justify-content-center");
            n.id = 'change';
            var h2 = document.createElement("h2");
            var br=document.createElement("br");
            n.appendChild(br);
            h2.textContent = "Lista de Compras";
            h2.classList.add("text-center", "mt-5");
            n.appendChild(h2);
            n.classList.add("container-sm", "w-75");
            n.appendChild(d);
            d.classList.add("text-black", "mt-5", "ml-5");
            d.innerHTML = (`
                <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Codigo</th>
                        <th scope="col">Pelicula</th>
                        <th scope="col">Fecha y hora</th>
                    </tr>
                </thead>
                <tbody id="cuerpo">        
            </tbody>
            </table> `
                    );
            contenedor.appendChild(n);

            listarCompras1();
        }
    }
}
async function listarCompras1() {
    if (data.rol == 2) {
        await listarComprasCliente(data);
    } else {
        await listarCompras();
    }

    var body = document.getElementById("cuerpo");
    var contador = 1;
    var td;
    var a;
    var th;
    var tr;
    compras.forEach((c) => {
        tr = document.createElement("tr");
        body.appendChild(tr);
        th = document.createElement("th");
        th.scope = "row";
        th.textContent = `${contador}`;
        td = document.createElement("td");
        var peliculita = document.createElement("td");
        var fechaYhora = document.createElement("td");
        tr.appendChild(th);
        tr.appendChild(td);
        a = document.createElement("a");
        a.href = "/Cinema/web/api/Compras/" + c.codigo + "/pdf";
        a.textContent = `${c.codigo}`;
        a.target = "_blank";
        td.appendChild(a);
        tr.appendChild(peliculita);
        tr.appendChild(fechaYhora);
        peliculita.textContent = `${c.p.pelicula.nombre}`;
        format(c.p.date);
        fechaYhora.textContent = `${fecha}`;
        contador++;
    });


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
            contenedor.classList.remove("d-flex", "justify-content-center");
            var fila = document.createElement("div");
            fila.classList.add("text-black", "row", "justify-content-center");
            contenedor.appendChild(fila);
            contenedor.classList.add("text-black", "justify-content-center");
            var d = document.createElement("div");
            fila.id = 'change';
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
      <div id="errorDiv" style="width:80%; margin: auto;"></div>
</form>
  
</div>
    `

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
                var file = $("#imagen").get(0).files[0];

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
            contenedor.classList.remove("d-flex", "justify-content-center");
            var d = document.createElement("div");
            fila.id = 'change';
            d.classList.add("col", "col-sm-8", "col-md-4", "col-xl-4", "d-flex");
            d.innerHTML = (`<div class="d-flex">
    <form> 
    <h3 class="mt-5">Registrar Sala</h2>
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
     <div id="errorDiv" style="width:80%; margin: auto;"></div>  
</form>
       
</div>`
                    );
            fila.appendChild(d);
            $("#RegSala").click(agregarSala);

        }
    }
}
async function drawProyeccion() {
    await recuperarSalas();
    if (salas.length == 0) {
        alert("Debe ingresar salas antes de acceder a esta funcionalidad");
        return;
    }
    $("#cambiar").hide();
    $("#barra").hide();
    $("#change").remove();

    recuperarPeliculas();
    try {
        let bandera = !!document.getElementById("change");
        throw bandera;
    } catch (error) {
        if (!error) {
            var contenedor = document.getElementById("content");
        contenedor.classList.remove("d-flex", "justify-content-center");
            var container = document.createElement("div");
            var fila = document.createElement("div");
            var h = document.createElement("h2");
            h.classList.add("ml-5", "mt-5");
            h.textContent = "Peliculas Disponibles";
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
                var contador = 0;
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
                <img src="${url}api/Peliculas/${p.nombre}/imagen" class="card-img-top embed-responsive-item" alt="..." id="${name}" data-toggle="modal" data-target="#staticBackdrop${contador}">
            </div>
            <div class="card-body border justify-content-center">
           
            <p class="card-text text-black" >
                  ${p.nombre}
            </p>
          </div>
            </div>
                <div class="modal fade signup-form" id="staticBackdrop${contador}" data-backdrop="static" data-keyboard="false" tabindex="-1"
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
                    <h2 id="nameP" class="d-none" name="nom-${name}"></h2>
                        <div class="form-group" id="s" name="s-${name}">
                    <p>Elegir sala</p>
                    
                        </div>
                        <div class="form-group">
                        <input type="date" class="form-control" name="fecha-${name}" id="fecha" placeholder="fecha" required="required">
                    </div> 
                    <div class="form-group">
                    <input type="time" class="form-control" name="hora-${name}" id="hora" placeholder="fecha" required="required">
                </div> 
                    <div class="form-group">
                            <input type="number" class="form-control" name="precio-${name}" id="precio" placeholder="Precio" required="required" min=0 max=200000>
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
                    contador++;


                });

            }
        }
    }
}
function listarSalas() {
    recuperarSalas();
    var contador = 0;
    var tar = `${event.target.id}`;
    var ayuda = document.getElementsByName(`s-${tar}`);
    if (salas.length == 0) {
        ayuda[0].innerHTML = (`<span id="men">No hay salas disponibles</span>`);
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
        ayuda[0].appendChild(nueva);




        nueva = document.getElementsByName(`nom-${tar}`);
        nueva[0].textContent = `${event.target.id}`;
        nueva[0].classList.remove("d-none");
        nueva[0].classList.add("d-block");

    }

}

function draw_home() {
    $("#cambiar").show();
    $("#barra").show();
    $("#change").remove();
    inicio_Admin();
    var contenedor = document.getElementById("content");
    contenedor.classList.remove("d-flex", "justify-content-center");
}
function draw_home_cliente() {
    $("#cambiar").show();
    $("#barra").show();
    $("#change").remove();
    var contenedor = document.getElementById("content");
    contenedor.classList.remove("d-flex", "justify-content-center");

}


async function mandarAgregarP() {

    await agregarPelicula();
    recuperarPeliculas();
    draw_movie();
}

function recuperarSalas() {
    return new Promise(function (sol, rechazo) {
        $.ajax({
            type: "GET",
            url: "/Cinema/web/api/Salas/listar"
        }).then((response) => {
            salas = [...response];
            sol("ok");
        },
                (error) => {
            rechazo("error");
        });


    });

}


export async function proyeccionesApeliculas(nom) {
    var ayuda = document.getElementById(`${nom}`);
    var pel = nom.split("-pro").join("");
    var x = await listarProyecciones(pel);
    if (proyecciones.length == 0) {
        ayuda.textContent = `${pel}`;
        ayuda.innerHTML = (`<span id="nop">No hay proyecciones disponibles</span>`);
    } else {
        $("#nop").remove();
        var di = document.createElement("div");
        di.textContent = pel;
        ayuda.appendChild(di);
        proyecciones.forEach((p) => {
            var nueva = document.createElement("div");
            p.date = format(p.date);
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
    if (location.pathname == opciones['cliente']) {
        var nue = document.getElementById("cambiar");
    } else {
        var nue = document.getElementById("tarjeta");
    }
    n.innerHTML = (` 
      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header" id="m-cuerpo">
            <br>
              <h5 class="modal-title text-black" id="exampleModalLabel">Comprar boletos</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="loginButton">
                <span aria-hidden="true">&times;</span>
              </button>
              <br>
            </div>
            <div class="modal-body">
              <div class="container justify-content-center">
                <ul class="showcase"  style="background:white;">
                  <li>
                    <div id="seat" class="seat"></div>
                    <small class="status text-black" style="font-size: 1em;">Libre</small>
                  </li>
                  <li>
                    <div id="seat" class="seat selected"></div>
                    <small class="status text-black" style="font-size: 1em;">Seleccionado</small>
                  </li>
                  <li>
                    <div id="seat" class="seat occupied"></div>
                    <small class="status text-black" style="font-size: 1em;">Ocupado</small>
                  </li>
                </ul>
                <div class="w-50 move" id="asientos" >
                  <div class="screen"></div>
                 
                  </div>
                </div>
            </div>
            <p class="text" style="font-size: 1em;margin:0px 0px 15px 0px" id="ojo">
            &nbsp;&nbsp;Ha seleccionado <span id="count">0</span> butacas por el precio de ₡&nbsp;<span id="total">0</span>
                    
            </p>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
              <button type="button" class="btn btn-primary" id="comprar">Comprar</button>
            </div>
            
          </div>
    
        </div>
               <div class="signup-form d-none" id ="mal">
                      <form>
                        <h2>Datos requeridos para efectuar la compra</h2>
                        <div class="input-group form-group mt-5" id="usertd">
                          <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-user"></i></span>
                          </div>
                          <input type="text" class="form-control" placeholder="cedula de identidad" required id="cedula2">
                          
                        </div>
                        <div class="input-group form-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fad fa-credit-card-front"></i></span>
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
        if (contador == 11) {
            fechita = fechita + "T";
        }
        if (bandera == false && sa[f] != "/") {
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
    proyecciones.forEach(p => {
        p.date = format(p.date);
    })
    var proye = proyecciones.find(z => z.date.toString() == dat.toString());
    proyeccion.pelicula = proye.pelicula;
    proyeccion.sala = proye.sala;
    proyeccion.date = proye.date;
    proyeccion.precio = proye.precio;
    await devuelveTiquetes();
    var cuerpo = document.getElementById("m-cuerpo");
    var nueva = document.createElement("div");
    nueva.id = "colums";
    cuerpo.appendChild(nueva);
    var nu = salas.find(p => p.codigo == salaaa);
    if (nu != undefined) {
        var asi = document.getElementById("asientos");
        asi.classList.add("align-self-end")
        var i, j = 0;

        for (i = 0; i < nu.fila; i++) {
            var rows = document.createElement("div");
            rows.classList.add("row", "pl-4", "justify-content-center", "d-flex");
            rows.style.background = "white";
            rows.style.margin = 0;
            rows.style.padding = 0;
            for (j = 0; j < nu.col; j++) {
                var columns = document.createElement("div");
                columns.id = `${i},${j}`;
                columns.classList.add("seat");
                rows.appendChild(columns);
            }
            asi.appendChild(rows);
        }
        var count = 0;
        pintarVendidos();
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

                } else if (!event.target.classList.contains('occupied') && event.target.classList.contains('selected')) {
                    count--;
                    total = count * proyeccion.precio;
                    event.target.classList.remove("selected");
                    document.getElementById("count").innerText = count;
                    document.getElementById("total").innerText = total;
                }


            });
        }
        var nueva1=document.getElementById("ojo")
        var cols=document.createElement("div");
        nueva1.appendChild(cols);
        cols.textContent=sa;
        cols.classList.add("text-center","pl-5");
        cols=document.createElement("div");
        nueva1.appendChild(cols);
        cols.style.position = "relative";
        cols.innerHTML = (
                `
        <div class="card">
        <div class="embed-responsive embed-responsive-16by9 bg-image" id="zoom">
        <img src="${url}api/Peliculas/${proyeccion.pelicula.nombre}/imagen" class="card-img-top embed-responsive-item" alt="...">
    </div>
    </div>
    </div>`
                );
                cuerpo.appendChild(nueva);
        $("#comprar").click(cargarCompra);


    }

}
function pintarVendidos() {
    x.forEach((v) => {
        var buta = document.getElementById(`${v.fila},${v.col}`);
        buta.classList.add("occupied");
    });
}

export function inicio_Admin() {
    $("#change").remove();
    recuperarPeliculas();
    var contenedor = document.getElementById("myChart");
    if (peliculas.length == 0) {
        contenedor.innerHTML = (`<span id="mensaje">NO EXISTEN PELICULAS DISPONIBLES</span>`);
    } else {
        $("#mensaje").remove();
        var row = document.createElement("div");
        row.id = "change";
        row.classList.add("row");
        peliculas.forEach((p) => {
            var nueva = document.createElement("div");
            nueva.id = "colums";
            var estatica = p.nombre;
            var xx = p.nombre;
            p.nombre = xx.split(" ").join("-");
            nueva.classList.add("col", "col-sm-8", "col-md-4", "col-xl-4", "mb-5", "border-dark", "ml-5");
            nueva.innerHTML = (
                    `
                <div class="card" id="tarjeta">
                <div class="embed-responsive embed-responsive-16by9" id="zoom">
                <img src="${url}api/Peliculas/${estatica}/imagen" class="card-img-top embed-responsive-item" alt="...">
            </div>
          <div class="card-body border justify-content-center" id="${p.nombre}-pro">
          <p class="card-text text-black" >
             ${p.nombre}
            </p>
          <div class="mb-2">
          <div class="flex-container">
              <label id="${p.nombre}-estado"></label>
              <div id="flex">
                  <div class="flex-item">
                      <input type="radio" name="${p.nombre}-oferta" value="1"  id="${p.nombre}-x">Disponible
                  </div>
              </div>

              <div id="flex">
                  <div class="flex-item">
                      <input type="radio" name="${p.nombre}-oferta" value="0" id="${p.nombre}-w">No Disponible
                  </div>
              </div>
          </div>
      </div>
          </div>
        </div>
      </div>`
                    );
            row.appendChild(nueva);

        });
        contenedor.appendChild(row);
        peliculas.forEach(p => {
            var b = document.getElementsByName(`${p.nombre}-oferta`);
            var label = document.getElementById(`${p.nombre}-estado`);
            if (p.estado == true) {
                var ayudoszky = b[0];
                label.textContent = "En Cartelera";
                ayudoszky.checked = true;
            } else {
                var ayudoszky = b[1];
                label.textContent = "No Disponible";
                ayudoszky.checked = true;
            }

            $(`#${p.nombre}-x`).click(nuevoEstado);
            $(`#${p.nombre}-w`).click(nuevoEstado);
        });


    }
}

async function nuevoEstado() {
    var id = event.target.id;
    var peli;
    var xx;
    var seleccion = id.split("-x").join("");
    if (seleccion[seleccion.length - 1] == "w") {
        seleccion = id.split("-w").join("");
        formatoNormal();
        peli = peliculas.find(p => p.nombre == seleccion);
        xx = seleccion.split("-").join(" ");
        setPelicula(xx, false);
    } else {
        formatoNormal();
        peli = peliculas.find(p => p.nombre == seleccion);
        xx = seleccion.split("-").join(" ");
        setPelicula(xx, true);
    }
    var label = document.getElementById(`${peli.nombre}-estado`);
    await cambiarEstado();
    if (pelicula.estado == false) {
        var boton = document.getElementById(`${seleccion}-w`);
        label.textContent = "No Disponible";
        boton.checked = true;
    } else {
        var boton = document.getElementById(`${seleccion}-x`);
        label.textContent = "En Cartelera";
        boton.checked = true;
    }
}
function formatoNormal() {
    peliculas.forEach((z) => {
        var m = z.nombre.split(" ").join("-");
        z.nombre = m;
    });
}
async function extraerDatosBusqueda() {
    var texto = document.getElementById("busca").value;
    if (texto == "") {
        texto = "*";
    }
    var solu = await BuscarPeliculas(texto);
    cargarPeliculas();

}
async function init_Draw() {
    if (location.pathname == opciones["admin"]) {
        $("#proyeccion").click(drawProyeccion);
        $("#pelicula").click(draw_movie);
        $("#home").click(draw_home);
        $("#salita").click(drawSala);
        $("#verCompras").click(draw_compras);
        $("#logout").click(logout);
        $("#busqueda").click(extraerDatosBusqueda);
        await recuperarPeliculas();
        inicio_Admin();
        getCurrentUser();
    }
    if (location.pathname == opciones["cliente"]) {

        $("#home").click(draw_home_cliente);
        $("#misCompritas").click(draw_compras);
        $("#chaitopapi").click(logout);
        $("#busqueda").click(extraerDatosBusqueda);
        $("#toditas").click(draw_compras);
        getCurrentUser();
        await recuperarPeliculas();
        cargarPeliculas();

    }
    if (location.pathname == opciones["inicio"] || location.pathname == opciones["salir"]) {
        $("#loginButton").click(login);
        $("#RegButton").click(registro);
        $("#busqueda").click(extraerDatosBusqueda);
        await recuperarPeliculas();
        cargarPeliculas();
    }
}
function quitarErrores() {
    var a = document.getElementById("cedulaa");
    var contraseña = document.getElementById("contraa");
    a.classList.remove("invalid");
    a.value = "";
    contraseña.classList.remove("invalid");
    contraseña.value = "";

}
export function errorMessage(status, place, tipo) {
    var error;
    switch (status) {
        case 404:
            error = `${tipo} no encontrada`;
            break;
        case 403:
            error = `${tipo} no autorizado`;
            location.href="/Cinema/web/presentation/cliente.html";
            return;
          
        case 405:
            error = `${tipo} no autorizado`;
            break;
        case 406:
        case 405:
            if (tipo == "Sala") {
                error = `${tipo} ya existe o las salas tienen mas de 9 filas y/o columnas`;
            } else {
                error = `${tipo} ya existe `;
            }

            break;
    }
    ;
    place.html('<div class="alert alert-danger fade show">' +
            '<button type="button" class="close" data-dismiss="alert">' +
            '&times;</button><h4 class="alert-heading">Error!</h4>' + error + '</div>');
    return;
}
function quitarErroresRegistro() {
    var a = document.getElementById("cedula");
    var nom = document.getElementById("nombre");
    var contraseña = document.getElementById("contra");
    a.classList.remove("invalid");
    nom.classList.remove("invalid");
    a.value = "";
    nom.value = "";
    contraseña.classList.remove("invalid");
    contraseña.value = "";
}
function loaded() {
    init_Draw();
    $("#cerrar").click(quitarErrores);
    $("#cerrar2").click(quitarErroresRegistro);
}

$(loaded);
