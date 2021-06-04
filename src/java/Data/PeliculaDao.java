/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Data;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import Logic.Pelicula;

/**
 *
 * @author DavidTK1198
 */
public class PeliculaDao {

    public void create(Pelicula o) throws Exception {
        String sql = "insert into Pelicula (Nombre,estado)"
                + "values(?,?)";
        PreparedStatement stm = DataBase.instance().prepareStatement(sql);
        stm.setString(1, o.getNombre());
        stm.setBoolean(2, o.isEstado());
        int count = DataBase.instance().executeUpdate(stm);
        if (count == 0) {
            throw new Exception("La pelicula ya existe");
        }
    }

    public List<Pelicula> findAll() {
        List<Pelicula> r = new ArrayList<>();
        String sql = "select * from Pelicula";
        try {
            PreparedStatement stm = DataBase.instance().prepareStatement(sql);
            ResultSet rs = DataBase.instance().executeQuery(stm);
            while (rs.next()) {
                r.add(from(rs));
            }
        } catch (SQLException ex) {
        }
        return r;
    }

    public List<Pelicula> findByNombre(Pelicula o) {
        List<Pelicula> r = new ArrayList<>();
        String sql = "select * from Pelicula where Nombre like ?";
        try {
            PreparedStatement stm = DataBase.instance().prepareStatement(sql);
            stm.setString(1, "%" + o.getNombre() + "%");
            ResultSet rs = DataBase.instance().executeQuery(stm);
            while (rs.next()) {
                r.add(from(rs));
            }
        } catch (SQLException ex) {
        }
        return r;
    }

    public List<Pelicula> findByEstado(Pelicula o) {
        List<Pelicula> r = new ArrayList<>();
        String sql = "select * from Pelicula where estado = ?";
        try {
            PreparedStatement stm = DataBase.instance().prepareStatement(sql);
            stm.setBoolean(1, o.isEstado());
            ResultSet rs = DataBase.instance().executeQuery(stm);
            while (rs.next()) {
                r.add(from(rs));
            }
        } catch (SQLException ex) {
        }
        return r;
    }

    public Pelicula read(String nom) throws Exception {
        String sql = "select * from Pelicula where  Nombre=?";
        PreparedStatement stm = DataBase.instance().prepareStatement(sql);
        stm.setString(1, nom);
        ResultSet rs = DataBase.instance().executeQuery(stm);
        if (rs.next()) {

            return from(rs);
        } else {
            throw new Exception("El usuario no Existe");
        }
    }

    public boolean updateStatus(Pelicula o) {
        try {
            String sql = "update Pelicula set estado = ? where Nombre = ?";
            PreparedStatement stm = DataBase.instance().prepareStatement(sql);
            stm.setString(2, o.getNombre());
            stm.setBoolean(1, o.isEstado());
            DataBase.instance().executeUpdate(stm);
            return true;

        } catch (SQLException ex) {
            return false;
        }
    }

    public Pelicula from(ResultSet rs) {
        try {
            Pelicula r = new Pelicula();
            r.setNombre(rs.getString("Nombre"));
            r.setEstado(rs.getBoolean("estado"));
            return r;
        } catch (SQLException ex) {
            return null;
        }
    }
  

}
