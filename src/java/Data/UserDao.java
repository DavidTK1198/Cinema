package Data;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * 
 * @author DavidTK1198
 */

import Logic.Usuario;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;


public class UserDao {

      public void create(Usuario o) throws Exception {
        String sql = "insert into Usuario (id_usu,clave,Rol,Nombre)"
                + "values(?,?,?,?)";
        PreparedStatement stm = DataBase.instance().prepareStatement(sql);
        stm.setString(1, o.getIdUsu());
        stm.setString(2, o.getClave());
        stm.setInt(3, o.getRol());
        stm.setString(4, o.getNombre());
        int count = DataBase.instance().executeUpdate(stm);
        if (count == 0) {
            throw new Exception("El usuario ya existe");
        }
    }
      
        public List<Usuario> findAll() {
        List<Usuario> r = new ArrayList<>();
        String sql = "select * from Usuario";
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

    public List<Usuario> findByNombre(Usuario o) {
        List<Usuario> r = new ArrayList<>();
        String sql = "select * from Usuario where id_usu like ?";
        try {
            PreparedStatement stm = DataBase.instance().prepareStatement(sql);
            stm.setString(2, "%" +o.getIdUsu() + "%");
            ResultSet rs = DataBase.instance().executeQuery(stm);
            while (rs.next()) {
                r.add(from(rs));
            }
        } catch (SQLException ex) {
        }
        return r;
    }
    public Usuario busquedaPorId(String id){
        
        String sql = "select * from Usuario where id_usu = ?";
        try {
            PreparedStatement stm = DataBase.instance().prepareStatement(sql);
            stm.setString(1,id);
            ResultSet rs = DataBase.instance().executeQuery(stm);
            if (rs.next()) {
                return from(rs);
            }
        } catch (SQLException ex) {
        }
        return null;
    }
    
    public Usuario read(String id,String cla) throws Exception{
        String sql="select * from Usuario where id_usu=? AND clave=?";
        PreparedStatement stm = DataBase.instance().prepareStatement(sql);
        stm.setString(1, id);
        stm.setString(2, cla);
        ResultSet rs =  DataBase.instance().executeQuery(stm);           
        if (rs.next()) {
            
            return from(rs);
        }
        else{
            return null;
        }
    }
    
  
      

    public Usuario from (ResultSet rs){
        try {
            Usuario r= new Usuario(); //creamos el usuario
            r.setRol(rs.getInt("Rol"));
            r.setIdUsu(rs.getString("id_usu"));
            r.setClave(rs.getString("clave"));
            r.setNombre(rs.getString("Nombre"));
            return r;
        } catch (SQLException ex) {
            return null;
        }
    }

}