/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Logic;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author DavidTK1198
 */
public class Compra {

    private Proyeccion p;
    private List<Butaca> lista;
    private Usuario user;
    private float total;

    public Compra(Proyeccion p, Usuario user) {
        this.p = p;
        this.lista = new ArrayList<>();
        this.user = user;
        this.total = 0.0f;
    }

    public Compra() {
        this.total = 0.0f;
        this.p = new Proyeccion();
        this.lista = new ArrayList<>();
        this.user = new Usuario();
    }

    public Proyeccion getP() {
        return p;
    }

    public void setP(Proyeccion p) {
        this.p = p;
    }

    public List<Butaca> getLista() {
        return lista;
    }

    public void setLista(List<Butaca> lista) {
        this.lista = lista;
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
        
    void CalcularTotal(){
        float pp=p.getPrecio()*lista.size();
        this.setTotal(pp);
    }
    public void setTotal(float total) {
        this.total = total;
    }

}
