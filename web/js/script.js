var precio = 3000;
class Pelicula {
    constructor(nombre,estado) {
        this.nombre = nombre;
        this.estado = estado;
    }
}
class Butaca {
    constructor(codigo) {
        this.codigo = codigo;
        this.estado = true;
    }
}


const usuario ={
    rol:1,
    idUsu:'1234',
    clave:'12346',
    nombre:'Panita'
};
const pelicula = {
    nombre: 'Spiderman',
    estado: true
   
};
const sala = {
    codigo : "A1",
    fila : 3,
    col: 4
};
const pr ={
   
    pelicula : pelicula,
    sala : sala,
    date : new Date(),
    precio : precio
    
};
const tiquete = {
 
  fila : 3,
  col : 2,
  codigo : 'B3',
  compra : null
    
    
};
const compraa = {
  p : pr,
  user : usuario,
  total : 0,
  codigo : '',
  tiquetes : new Array()
    
};

compraa.tiquetes.push(tiquete);
function probar(){
    $.ajax({type: "POST",
        url: "/Cinema/web/api/test",
        data: JSON.stringify(usuario),
        contentType: "application/json"
    }).then((usuario) => {
            console.log(`${usuario} pura vida`)
    },
    (error) => {
        console.log(error);
    });  
}

function probar1(){
    $.ajax({type: "POST",
        url: "/Cinema/web/api/agregarP",
        data: JSON.stringify(pelicula),
        contentType: "application/json"
    }).then((peli) => {
            console.log(`${peli} pura vida`)
    },
    (error) => {
        console.log(error);
    });  
}
function probar2(){
    $.ajax({type: "POST",
        url: "/Cinema/web/api/salaA",
        data: JSON.stringify(sala),
        contentType: "application/json"
    }).then((sala) => {
            console.log(`${sala} pura vida`)
    },
    (error) => {
        console.log(error);
    });  
}
function probar3(){
    $.ajax({type: "POST",
        url: "/Cinema/web/api/proyeccionesA",
        data: JSON.stringify(pr),
        contentType: "application/json"
    }).then((response) => {
            console.log(`${response} pura vida`)
    },
    (error) => {
        console.log(error);
    });  
}
function probar4(){
    $.ajax({type: "POST",
        url: "/Cinema/web/api/com",
        data: JSON.stringify(compraa),
        contentType: "application/json"
    }).then((response) => {
            console.log(`${response} pura vida`)
    },
    (error) => {
        console.log(error);
    });  
}








    const app=new Vue({
        el:'#app',
        data:{
            peliculas:[]
        },
        methods: {
            Cargar() {
                spiderman = new Pelicula("Spider-man");
                Batman = new Pelicula("Batman");
                boku = new Pelicula("Boku no Hero");
                this.peliculas.push(spiderman);
                this.peliculas.push(Batman);
                this.peliculas.push(boku);
                for(i=0;i<3;i++){
                    p=new Proyeccion(spiderman);
                    spiderman.funciones.push(p);
                    p=new Proyeccion(Batman);
                    Batman.funciones.push(p);
                    p=new Proyeccion(boku);
                    boku.funciones.push(p);
                }
            }
        },
        created() {
            this.Cargar();
        },
    });

    function loaded() {
        $("#loginButton1").click(probar4);
    }
    $(loaded);
      