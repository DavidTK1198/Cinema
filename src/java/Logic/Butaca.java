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

public class Butaca {
    
    private int fila;
    private int col;

    public Butaca(int fil,int col) {
        this.fila=fil;
        this.col=col;
      
    }
    public Butaca(){
         this.fila=0;
        this.col=0;
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
