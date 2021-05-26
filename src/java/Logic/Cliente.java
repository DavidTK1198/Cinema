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
 * @author Daniel Madrigal
 */
public class Cliente extends Usuario {
    private List<Proyeccion> proyecciones;

    public List<Proyeccion> getProyecciones() {
        return proyecciones;
    }

    public void setProyecciones(List<Proyeccion> proyecciones) {
        this.proyecciones = proyecciones;
    }

    public Cliente(int rol, String idUsu, String clave, String nombr) {
        super(rol, idUsu, clave, nombr);
        this.proyecciones = new ArrayList<>();
    }
    public void agregarProyeccion(Proyeccion pr)throws Exception{
        this.proyecciones.add(pr);
    }
    
    
}
