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
    private String Nombre;
    private boolean estado;

    public String getNombre() {
        return Nombre;
    }

    public void setNombre(String Nombre) {
        this.Nombre = Nombre;
    }

    public boolean isEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }

    public Pelicula() {
        this.Nombre="";
        this.estado=false;
    }

    public Pelicula(String Nombre, boolean estado) {
        this.Nombre = Nombre;
        this.estado = estado;
    }
    
    
}
