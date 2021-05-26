/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Logic;

import java.util.Date;

/**
 *
 * @author Daniel Madrigal
 */
public class Proyeccion {
    private Pelicula pelicula;
    private Sala sala;
    private Date date;

    public Proyeccion(Pelicula pelicula, Sala sala, Date date) {
        this.pelicula = pelicula;
        this.sala = sala;
        this.date = date;
    }
    public Proyeccion(){
        this.pelicula = new Pelicula();
        this.sala = new Sala();
        this.date = new Date();
    }

    public Pelicula getPelicula() {
        return pelicula;
    }

    public void setPelicula(Pelicula pelicula) {
        this.pelicula = pelicula;
    }

    public Sala getSala() {
        return sala;
    }

    public void setSala(Sala sala) {
        this.sala = sala;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
    
}
