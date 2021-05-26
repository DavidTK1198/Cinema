/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Logic;

import java.util.Objects;
import java.util.Random;

/**
 *
 * @author Daniel Madrigal
 */
public class Usuario {

    private int rol;
    private String idUsu;
    private String clave;
    private String nombre;

    public Usuario() {
        rol = 0;
        idUsu = "";
        clave = "";
        nombre = "";
    }

    public Usuario(int rol, String idUsu, String clave,String nombr) {
        this.rol = rol;
        this.idUsu = idUsu;
        this.clave = clave;
        this.nombre = nombr;
    }

   
    @Override
    public String toString() {
        return "Usuario{" + "rol=" + rol + ", idUsu=" + idUsu + ", clave=" + clave + '}';
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Usuario other = (Usuario) obj;
        if (this.idUsu != other.idUsu) {
            return false;
        }
        if (!Objects.equals(this.rol, other.rol)) {
            return false;
        }
        if (!Objects.equals(this.clave, other.clave)) {
            return false;
        }
        return true;
    }

    public void generarClave() {
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

        this.setClave(contra);
    }

    public int getRol() {
        return rol;
    }

    public void setRol(int rol) {
        this.rol = rol;
    }

    public String getIdUsu() {
        return idUsu;
    }

    public void setIdUsu(String idUsu) {
        this.idUsu = idUsu;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }


    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }

}
