var precio = 3000;
var peliculas = [];
class Pelicula {
    constructor(nombre) {
        this.nombre = nombre;
        this.funciones = [];
    }
}
class Butaca {
    constructor(codigo) {
        this.codigo = codigo;
        this.estado = true;
    }
}
class Proyeccion {
    constructor(pelicula) {
        this.fecha = new Date();
        this.butacas = [];
        this.pelicula = pelicula;
    }
}
function cargarPeliculas() {
    spiderman = new Pelicula("Spider-man");
    Batman = new Pelicula("Batman");
    boku = new Pelicula("Boku no Hero");
    peliculas.push(spiderman);
    peliculas.push(Batman);
    peliculas.push(boku);
    for(i=0;i<3;i++){
        p=new Proyeccion(spiderman);
        spiderman.funciones.push(p);
    }
    for(i=0;i<3;i++){
        p=new Proyeccion(Batman);
        Batman.funciones.push(p);
    }
    for(i=0;i<3;i++){
        p=new Proyeccion(boku);
        boku.funciones.push(p);
    }
}

$(window).on('load', () => {
    cargarPeliculas();
    var cartelera = document.getElementById("cartelera");
    peliculas.forEach((a) => {
        d = document.createElement("div");
        d.classList.add("col", "col-sm-8", "col-md-4", "col-xl-4", "mb-5", "border-dark");
        d.innerHTML = (`<div class="card" >
        <div class="embed-responsive embed-responsive-16by9" id="zoom">
            <img src="img/${a.nombre}.jpg" class="card-img-top embed-responsive-item" alt="...">
        </div>
        <div class="card-body border justify-content-center">
            <h5 class="card-title"> Nombre:</h5>
            <p class="card-text text-black">
                Nombre:${a.nombre}
            </p>
        </div>
    </div>`);
        cartelera.appendChild(d);
    }
    );
})
