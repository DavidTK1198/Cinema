/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Data;

import Logic.Compra;
import Logic.Proyeccion;
import Logic.Service;
import Logic.Usuario;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Daniel Madrigal
 */
public class CompraDao {

    public void create(Compra o) throws Exception {
        String sql = "insert into Compra (Proyeccion_id,Usuario_id,Precio)"
                + "values(?,?,?)";
        PreparedStatement stm = DataBase.instance().prepareStatement(sql);
        Proyeccion proyeccionId = Service.getInstance().buscarProyeccionDevuelvePro(o.getP().getPelicula().getNombre());
        if (proyeccionId == null) {
            throw new Exception("No existe proyeccion");
        }
        stm.setString(1, proyeccionId.getPelicula().getNombre());
        stm.setString(2, o.getUser().getIdUsu());
        stm.setFloat(3, o.getTotal());
        int count = DataBase.instance().executeUpdate(stm);
        if (count == 0) {
            throw new Exception("La compra ya existe");
        }
    }

    public List<Compra> findAll() {
        List<Compra> r = new ArrayList<>();
        String sql = "select * from Compra";
        try {
            PreparedStatement stm = DataBase.instance().prepareStatement(sql);
            ResultSet rs = DataBase.instance().executeQuery(stm);
            while (rs.next()) {
                r.add(from(rs, true));
            }
        } catch (SQLException ex) {
        }
        return r;
    }

    public List<Compra> findByProyeccion(Compra o) {
        List<Compra> r = new ArrayList<>();
        String sql = "select * from Compra where Proyeccion_id = ? AND Usuario_id=?";
        try {
            PreparedStatement stm = DataBase.instance().prepareStatement(sql);
            stm.setString(1, o.getP().getPelicula().getNombre());
            stm.setString(2, o.getUser().getIdUsu());
            ResultSet rs = DataBase.instance().executeQuery(stm);
            while (rs.next()) {
                r.add(from(rs, true));
            }
        } catch (SQLException ex) {
        }
        return r;
    }

    public List<Compra> read(Proyeccion pr) throws Exception {
        List<Compra> lc = new ArrayList<>();
        String sql = "select c.Proyeccion_id proyeccion, c.Usuario_id usuario from Compra c, proyeccion p, sala s where c.Proyeccion_id=p.idProyeccion AND "
                + "p.pelicula_Nombre = ? AND p.Sala_id = s.id_sala";
        PreparedStatement stm = DataBase.instance().prepareStatement(sql);
        stm.setString(1, pr.getPelicula().getNombre());
        ResultSet rs = DataBase.instance().executeQuery(stm);
        if (rs.next()) {
            lc.add(from(rs, false));
            
        } else {
            throw new Exception("El usuario no Existe");
        }
        return lc;
    }

    public Compra from(ResultSet rs, boolean bandera) {
        Proyeccion p;
        Usuario us;
        try {
            Compra r = new Compra(); //creamos el usuario
            if (bandera == true) {
                 p = Service.getInstance().buscarProyeccionDevuelvePro(rs.getString("Proyeccion_id"));
                 us = Service.getInstance().buscarUsuario(rs.getString("Usuario_id"));
            } else {
                p = Service.getInstance().buscarProyeccionDevuelvePro(rs.getInt("proyeccion"));
                us = Service.getInstance().buscarUsuario(rs.getString("usuario"));
            }
           
            r.setP(p);
            r.setUser(us);

            return r;
        } catch (SQLException ex) {
            return null;
        } catch (Exception ex) {
            return null;
        }
    }
}
