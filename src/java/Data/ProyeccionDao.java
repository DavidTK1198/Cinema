/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Data;

import Logic.Pelicula;
import Logic.Proyeccion;
import Logic.Sala;
import Logic.Service;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.sql.Date;

/**
 *
 * @author Daniel Madrigal
 */
public class ProyeccionDao {

    public void create(Proyeccion o) throws Exception {
        String sql = "insert into Proyeccion (Pelicula_Nombre,Sala_id,Date)"
                + "values(?,?,?)";
        PreparedStatement stm = DataBase.instance().prepareStatement(sql);
        stm.setString(1, o.getPelicula().getNombre());
        stm.setString(2, o.getSala().getCodigo());
        String fechaa = o.transformarFormatoDato();
        Date fecha = Date.valueOf(fechaa);
        stm.setDate(3, fecha);
        int count = DataBase.instance().executeUpdate(stm);
        if (count == 0) {
            throw new Exception("La proyeccion ya existe");
        }
    }

    public List<Proyeccion> findAll() {
        List<Proyeccion> r = new ArrayList<>();
        String sql = "select * from Proyeccion";
        try {
            PreparedStatement stm = DataBase.instance().prepareStatement(sql);
            ResultSet rs = DataBase.instance().executeQuery(stm);
            while (rs.next()) {
                r.add(from(rs));
            }
        } catch (SQLException ex) {
        } catch (Exception ex) {
            
        }
        return r;
    }

    public List<Proyeccion> findByNombreSala(Proyeccion o) {
        List<Proyeccion> r = new ArrayList<>();
        String sql = "select * from Proyeccion where Pelicula_Nombre = ? AND Sala_id = ?";
        try {
            PreparedStatement stm = DataBase.instance().prepareStatement(sql);
            stm.setString(1, o.getPelicula().getNombre());
            stm.setString(2, o.getSala().getCodigo());
            ResultSet rs = DataBase.instance().executeQuery(stm);
            while (rs.next()) {
                r.add(from(rs));
            }
        } catch (SQLException ex) {
        } catch (Exception ex) {
           
        }
        return r;
    }

   

    public Proyeccion read(String id) throws Exception {
        String sql = "select * from Proyeccion where Pelicula_Nombre=?";
        PreparedStatement stm = DataBase.instance().prepareStatement(sql);
        stm.setString(1, id);
        ResultSet rs = DataBase.instance().executeQuery(stm);
        if (rs.next()) {
            return from(rs);
        } else {
            throw new Exception("La proyeccion ya existe");
        }
    }
    public int buscarIdProyeccion(String pr)throws Exception{
         String sql = "select Proyeccion_id from Proyeccion where Pelicula_Nombre=?";
        PreparedStatement stm = DataBase.instance().prepareStatement(sql);
        stm.setString(1, pr);
        ResultSet rs = DataBase.instance().executeQuery(stm);
        if (rs.next()) {
           int nu = rs.getInt("Proyeccion_id");
           return nu;
        } else {
            throw new Exception("No existe proyeccion con el nombre "+ pr);
        }
    }
    public Proyeccion buscarProyeccionPorNumero(int n) throws SQLException, Exception{
         String sql = "select * from Proyeccion where idProyeccion=?";
        PreparedStatement stm = DataBase.instance().prepareStatement(sql);
        stm.setInt(1, n);
        ResultSet rs = DataBase.instance().executeQuery(stm);
        if (rs.next()) {
           return from(rs);
        } else {
            throw new Exception("No existe proyeccion con el nombre ");
        }
    }

    public Proyeccion from(ResultSet rs) throws Exception {
        try {
            Proyeccion r = new Proyeccion();
            Pelicula peli = Service.getInstance().buscarPelicula(rs.getString("Pelicula_Nombre"));
            r.setPelicula(peli);
            Date fecha = rs.getDate("Date");
            String fe = fecha.toString();
            r.transformarFormatoADate(fe);
            Sala sala = Service.getInstance().buscarSala(rs.getString("Sala_id"));
            r.setSala(sala);
            return r;
        } catch (SQLException ex) {
            return null;
        }
    }
}
