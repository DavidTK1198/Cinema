/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Logic;

import java.util.Random;

/**
 *
 * @author Daniel Madrigal
 */

public class Butaca {
    
    private String codigo;
    private boolean estado;
    private Sala sala;

    public Butaca(String codigo, boolean estado, Sala sala) {
        this.codigo = codigo;
        this.estado = estado;
        this.sala = sala;
    }
    public Butaca(){
        this.codigo = this.codigoAutomatico();
        this.estado = false;
        this.sala = new Sala();
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public boolean isEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }

    public Sala getSala() {
        return sala;
    }

    public void setSala(Sala sala) {
        this.sala = sala;
    }
      private String codigoAutomatico(){
        Random rand = new Random();
        String contra = "";
      
        int n;
        char caracter;
        int i=0;
        boolean bandera = false;
        while (true) {
            n = 1 + rand.nextInt(100);
            if(i==2){
                break;
            }
            caracter = (char) n;
            if (Character.isAlphabetic(caracter) && bandera == false) {
                contra = contra + caracter;
                contra = contra.toUpperCase();
                bandera = true;
                i++;
                Service.contador++;
            }else{
                if(bandera == true){
                    contra = contra + Service.contador;
                 
                }
               
            }
        }
       return contra;
    }
    
}
