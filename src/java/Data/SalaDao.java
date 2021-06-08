/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Data;

import Logic.Sala;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Daniel Madrigal
 */
public class SalaDao {
      public void create(Sala o) throws Exception {
        String sql = "insert into Sala (Codigo,fila,col)"
                + "values(?,?,?)";
        PreparedStatement stm = DataBase.instance().prepareStatement(sql);
        stm.setString(1, o.getCodigo());
        stm.setInt(2, o.getCol());
        stm.setInt(3, o.getFila());
        int count = DataBase.instance().executeUpdate(stm);
        if (count == 0) {
            throw new Exception("La Sala ya existe");
        }
        
    }
         public Sala read(String id) throws Exception{
        String sql="select * from Sala where Codigo=?";
        PreparedStatement stm = DataBase.instance().prepareStatement(sql);
        stm.setString(1, id);
        ResultSet rs =  DataBase.instance().executeQuery(stm);           
        if (rs.next()) {
            return from(rs);
        }
        else{
            throw new Exception ("La sala no Existe");
        }
    }
    public List<Sala> findAll() throws SQLException, Exception{
        List<Sala> sala= new ArrayList<>();
        String sql="select * from Sala";
        PreparedStatement stm = DataBase.instance().prepareStatement(sql);
        
        ResultSet rs =  DataBase.instance().executeQuery(stm);           
        while(rs.next()) {
            sala.add(from(rs));
            
        }
        if(sala.isEmpty()){
            throw new Exception();
        }
        return sala;
        
    }
  
      

    public Sala from (ResultSet rs){
        try {
            Sala r= new Sala(); //creamos el usuario
            r.setCodigo(rs.getString("Codigo"));
            r.setCol(rs.getInt("col"));
            r.setFila(rs.getInt("fila"));
          
            return r;
        } catch (SQLException ex) {
            return null;
        }
    }
}
