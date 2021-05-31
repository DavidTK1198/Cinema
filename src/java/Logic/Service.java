/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Logic;

import Data.PeliculaDao;
import Data.ProyeccionDao;
import Data.SalaDao;
import Data.UserDao;

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

    public Service() {
        users = new UserDao();
        peliculas = new PeliculaDao();
        salas = new SalaDao();
        proyecciones = new ProyeccionDao();
    }

    public static Service getInstance() {
        if (my_instance == null) {
            my_instance = new Service();
        }

        return my_instance;
    }
    public void agregarProyeccion(Proyeccion pr)throws Exception{
        
    }
    public Pelicula buscarPelicula(String nom) throws Exception{
        return peliculas.read(nom);
    }
    public Sala buscarSala(String cod)throws Exception{
        return salas.read(cod);
    }
    public int buscarProyeccionPorNombre(String nom)throws Exception{
        return proyecciones.buscarIdProyeccion(nom);
    }
    public Proyeccion buscarProyeccionDevuelvePro(String nom)throws Exception{
        return proyecciones.read(nom);
    }
     public Proyeccion buscarProyeccionDevuelvePro(int n)throws Exception{
        return proyecciones.buscarProyeccionPorNumero(n);
    }
    public Usuario buscarUsuario(String id)throws Exception{
        return users.busquedaPorId(id);
    }

    public void agregarUsuario(Usuario p) throws Exception {
        users.create(p);
    }
}
