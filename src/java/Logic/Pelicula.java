package Logic;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author DavidTK1198
 */
public class Pelicula {
    private String nombre;
    private boolean estado;

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String Nombre) {
        this.nombre = Nombre;
    }

    public boolean isEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }

    public Pelicula() {
        this.nombre="";
        this.estado=false;
    }

    public Pelicula(String nom, boolean estado) {
        this.nombre = nom;
        this.estado = estado;
    }
    
    
}
