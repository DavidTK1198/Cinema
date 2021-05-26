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
 * @author Daniel Madrigal
 */
public class Sala {
    private String codigo;
    private List<Butaca> butacas;

    public Sala(String codigo) {
        this.codigo = codigo;
        this.butacas =  new ArrayList<>();
    }
    public Sala(){
        this.codigo = "";
        this.butacas = new ArrayList<>();
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public List<Butaca> getButacas() {
        return butacas;
    }

    public void setButacas(List<Butaca> butacas) {
        this.butacas = butacas;
    }
  
}
