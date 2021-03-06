/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Logic;

import Data.CompraDao;
import Data.PeliculaDao;
import Data.ProyeccionDao;
import Data.SalaDao;
import Data.TiqueteDao;
import Data.UserDao;
import java.util.List;

/**
 *
 * @author Daniel Madrigal
 */
public class Service {

    public static int contador = 0;
    private static Service my_instance = null;
    UserDao users;
    PeliculaDao peliculas;
    SalaDao salas;
    ProyeccionDao proyecciones;
    CompraDao compras;
    TiqueteDao tiquetes;
    
    public Service() {
        users = new UserDao();
        peliculas = new PeliculaDao();
        salas = new SalaDao();
        proyecciones = new ProyeccionDao();
        compras = new CompraDao();
        tiquetes = new TiqueteDao();
        
    }
    
    public static Service getInstance() {
        if (my_instance == null) {
            my_instance = new Service();
        }
        
        return my_instance;
    }

    public void agregarProyeccion(Proyeccion pr) throws Exception {
        this.proyecciones.create(pr);
    }

    public void agregarPelicula(Pelicula pr) throws Exception {
        this.peliculas.create(pr);
    }

    public void agregarSala(Sala sa) throws Exception {
        this.salas.create(sa);
    }

    public void agregarCompra(Compra com) throws Exception {
        this.compras.create(com);
    }

    public void agregarUsuario(Usuario p) throws Exception {
        users.create(p);
    }

    public void agregarTiquete(Tiquete tiq) throws Exception {
        this.tiquetes.create(tiq);
    }

    public Pelicula buscarPelicula(String nom) throws Exception {
        return peliculas.read(nom);
    }

    public Sala buscarSala(String cod) throws Exception {
        return salas.read(cod);
    }

    public int buscarProyeccionPorNombre(String nom) throws Exception {
        return proyecciones.buscarIdProyeccion(nom);
    }

    public Proyeccion buscarProyeccionDevuelvePro(String nom) throws Exception {
        return proyecciones.read(nom);
    }

    public Proyeccion buscarProyeccionDevuelvePro(int n) throws Exception {
        return proyecciones.buscarProyeccionPorNumero(n);
    }
    public List<Proyeccion> buscarProyeccionesPorNombreSala(Proyeccion s){
        return proyecciones.findByNombreSala(s);
    }
     public List<Pelicula> devolverPeliculas(){
        return peliculas.findAll();
    }
    public List<Proyeccion> devolverProyecciones(){
        return proyecciones.findAll();
    }
     public List<Proyeccion> devolverProyeccionesPorNombre(String nom){
        return proyecciones.findbyNombre(nom);
    }
    
    public Usuario buscarUsuario(Usuario p) throws Exception {
        return users.read(p.getIdUsu(),p.getClave());
    }
     public Usuario buscarUsuarioid(String id) throws Exception {
        return users.busquedaPorId(id);
    }
    
    
    public Compra BuscarCompra(String cod) throws Exception {
        return compras.buscarCompraPorCodigo(cod);
    }
    public List<Compra> comprasPorProyeccionExacta(Proyeccion pr)throws Exception{
        return compras.read(pr);
    }
    public List<Tiquete> tiquetesPorCompras(List<Compra> lc)throws Exception{
        
        return tiquetes.tiquetesPorCompra(lc);
    }
    public List<Tiquete> tiquetesPorCompraEspecifica(Compra c)throws Exception{
        
        return tiquetes.tiquetesPorCompraEspecifica(c);
    }
     public List<Sala> devolverSalas()throws Exception{
        return salas.findAll();
    }
     public int busquedaDePro(Proyeccion pr) throws Exception{
         return proyecciones.BusquedaEspecifica(pr);
     }
     public void TiquetesAlaBase(List<Tiquete> lc){
          tiquetes.agregarTiquetes(lc);
     }
     public List<Compra> devuelveComprasMismaProyeccion(Proyeccion pr) throws Exception{
         return compras.read(pr);
         
     }
     public List<Tiquete> cargaTiquets(Proyeccion pr) throws Exception{
         List<Compra> lc =  devuelveComprasMismaProyeccion(pr);
         return tiquetesPorCompras(lc);
     }
     
     public List<Compra> compras_all (){
         return compras.findAll();
     }
     
     public void actualizarPelicula(Pelicula p){
         peliculas.updateStatus(p);
     }
     public List<Pelicula> filtrarNombrePeli(String nom){
         return peliculas.findByNombre(nom);
     }
       public List<Compra> comprasbyUser (Usuario us){
         return compras.findByUser(us);
     }
    
     
}
