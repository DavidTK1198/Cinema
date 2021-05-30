/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Logic;

/**
 *
 * @author Daniel Madrigal
 */

public class Tiquete {
    private String codigo;
    private int fila;
    private int col;
    Compra compra;

    public Tiquete(int fil,int col,Compra c) {
        this.fila=fil;
        this.col=col;
        this.codigo = ""; 
        this.compra = c;
      
    }
    public Tiquete(){
         this.fila=0;
        this.col=0;
        this.codigo = "";
        this.compra = new Compra();
    }

    public Compra getCompra() {
        return compra;
    }

    public void setCompra(Compra compra) {
        this.compra = compra;
    }
    

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public int getFila() {
        return fila;
    }

    public void setFila(int fila) {
        this.fila = fila;
    }

    public int getCol() {
        return col;
    }

    public void setCol(int col) {
        this.col = col;
    }  
    
}
