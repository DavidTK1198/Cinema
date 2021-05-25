var precio = 3000;
class Pelicula {
    constructor(nombre) {
        this.nombre = nombre;
        this.funciones = [];
        this.img=`img/${nombre}.jpg`
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
function init(){
    const app=new Vue({
        el:'#app',
        data:{
            peliculas:[]
        },
        methods: {
            cargarPeliculas() {
                spiderman = new Pelicula("Spider-man");
                Batman = new Pelicula("Batman");
                boku = new Pelicula("Boku no Hero");
                this.peliculas.push(spiderman);
                this.peliculas.push(Batman);
                this.peliculas.push(boku);
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
        },
        created() {
            this.cargarPeliculas();
        },
    });
}
$(window).on('load',init);
