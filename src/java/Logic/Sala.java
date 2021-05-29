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
public class Sala {
    private String codigo;
    private int fila;
    private int col;

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
    

    public Sala(String codigo,int fil,int col) {
        this.codigo = codigo;
        this.fila=fil;
        this.col=col;
   
    }
    public Sala(){
        this.codigo = "";
          this.fila=0;
        this.col=0;

    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }
    
}

