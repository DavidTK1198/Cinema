/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Logic;


/**
 *
 * @author DavidTK1198
 */
public class Compra {

    private Proyeccion p;
 
    private Usuario user;
    private float total;

    public Compra(Proyeccion p, Usuario user) {
        this.p = p;
        this.user = user;
        this.total = 0.0f;
    }

    public Compra() {
        this.total = 0.0f;
        this.p = new Proyeccion();
        this.user = new Usuario();
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

}
