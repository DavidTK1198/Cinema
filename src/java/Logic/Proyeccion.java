/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Logic;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 *
 * @author Daniel Madrigal
 */
public class Proyeccion {

    private Pelicula pelicula;
    private Sala sala;
    private Date date;
    private float precio;

    public Proyeccion(Pelicula pelicula, Sala sala, Date date, float pre) {
        this.pelicula = pelicula;
        this.sala = sala;
        this.date = date;
        this.precio = pre;
    }

    public Proyeccion() {
        this.pelicula = new Pelicula();
        this.sala = new Sala();
        this.date = new Date();//
        this.precio = 0.0f;
    }

    public float getPrecio() {
        return precio;
    }

    public void setPrecio(float precio) {
        this.precio = precio;
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

    public String transformarFormatoDato() {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd hh:mm");
        String format = formatter.format(date);
        return format;
    }
    public void transformarFormatoADate(String fe) throws ParseException{
        this.date = new SimpleDateFormat("yyyy/MM/dd hh:mm").parse(fe);
    }

}
