/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Logic;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;


/**
 *
 * @author DavidTK1198
 */
public class Compra {

    private Proyeccion p;
    private Usuario user;
    private float total;
    private String codigo;
    private List<Tiquete> tiquetes;

    public Compra(Proyeccion p, Usuario user) {
        this.p = p;
        this.user = user;
        this.total = 0.0f;
        this.codigo = this.generarCodigo();
        this.tiquetes = new ArrayList<>();
    }

    public Compra() {
        this.total = 0.0f;
        this.p = new Proyeccion();
        this.user = new Usuario();
        this.codigo = this.generarCodigo();
        this.tiquetes = new ArrayList<>();
    }

    public Proyeccion getP() {
        return p;
    }

    public void setP(Proyeccion p) {
        this.p = p;
    }

 
    public Usuario getUser() {
        return user;
    }

    public void setUser(Usuario user) {
        this.user = user;
    }

    public float getTotal() {
        return total;
    }
        
   
    public void setTotal(float total) {
        this.total = total;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }
    public void agregarTiquete(Tiquete tiq){
        this.tiquetes.add(tiq);
    }
     private String generarCodigo() {
        Random rand = new Random();
        String contra = "";
        int n;
        char caracter;
        int i=0;
        while (true) {
            n = 1 + rand.nextInt(100);
            if(i==5){
                break;
            }
            caracter = (char) n;
            if (Character.isAlphabetic(caracter)) {
                contra = contra + caracter;
                i++;
            }
        }

        return contra;
    }

}
