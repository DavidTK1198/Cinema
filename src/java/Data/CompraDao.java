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
import java.sql.Date;
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
        String sql = "insert into Compra (id_com,Proyeccion_id,Usuario_id,Precio)"
                + "values(?,?,?,?)";
        PreparedStatement stm = DataBase.instance().prepareStatement(sql);
        stm.setString(1, o.getCodigo());
        Proyeccion proyeccionId = Service.getInstance().buscarProyeccionDevuelvePro(o.getP().getPelicula().getNombre());
        if (proyeccionId == null) {
            throw new Exception("No existe proyeccion");
        }
        int n = Service.getInstance().busquedaDePro(o.getP());
         stm.setInt(2,n);
        stm.setString(3, o.getUser().getIdUsu());
        stm.setFloat(4, o.getTotal());
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
    public List<Compra> findByUser(Usuario o) {
        List<Compra> r = new ArrayList<>();
        String sql = "select * from Compra where Usuario_id=?";
        try {
            PreparedStatement stm = DataBase.instance().prepareStatement(sql);
            stm.setString(1, o.getIdUsu());
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
        String sql = "select c.Proyeccion_id proyeccion, c.Usuario_id usuario, c.id_com cod from Compra c, proyeccion p, sala s where c.Proyeccion_id=p.idProyeccion AND "
                + "p.pelicula_Nombre = ? AND p.Sala_id = s.Codigo AND p.Date = ?";
        PreparedStatement stm = DataBase.instance().prepareStatement(sql);
        stm.setString(1, pr.getPelicula().getNombre());
        Date fecha = new Date(pr.getDate().getTime());
        stm.setDate(2, fecha);
        ResultSet rs = DataBase.instance().executeQuery(stm);
        while(rs.next()) {
            lc.add(from(rs, false));

        }
        if(lc.isEmpty()){
            return lc;
        }
        
        return lc;
    }

    public Compra from(ResultSet rs, boolean bandera) {
        Proyeccion p = null;
        Usuario us = null;
        try {
            Compra r = new Compra(); //creamos el usuario
            
            if (bandera == true) {
                r.setCodigo(rs.getString("id_com"));
                p = Service.getInstance().buscarProyeccionDevuelvePro(rs.getInt("Proyeccion_id"));
                us = Service.getInstance().buscarUsuarioid(rs.getString("Usuario_id"));
                r.setTotal(rs.getFloat("Precio"));
            } else {
                r.setCodigo(rs.getString("cod"));
                p = Service.getInstance().buscarProyeccionDevuelvePro(rs.getInt("proyeccion"));
                //us = Service.getInstance().buscarUsuario(rs.getString("usuario"));
            }

            r.setP(p);
            r.setUser(us);
            
            
            //r.setUser(us);

            return r;
        } catch (SQLException ex) {
            return null;
        } catch (Exception ex) {
            return null;
        }
    }

    public Compra buscarCompraPorCodigo(String cod) throws SQLException, Exception {
        String sql = "select * from Compra where id_com = ?";
        PreparedStatement stm = DataBase.instance().prepareStatement(sql);
        stm.setString(1, cod);
        ResultSet rs = DataBase.instance().executeQuery(stm);
         if (rs.next()) {
            return from(rs,true);

        } else {
            throw new Exception("El usuario no Existe");
        }
        
    }
}
