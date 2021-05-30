/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Data;

import Logic.Compra;
import java.sql.PreparedStatement;
import Logic.Tiquete;
import Logic.Tiquete;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author DavidTK1198
 */
public class TiqueteDao {

    public void create(Tiquete o) throws Exception {
        String sql = "insert into Tiquete (Fila,col,codigo,compra)"
                + "values(?,?,?,?)";
        PreparedStatement stm = DataBase.instance().prepareStatement(sql);
        stm.setInt(1, o.getFila());
        stm.setInt(2, o.getCol());
        stm.setString(3, o.getCodigo());
        // stm.setString(4, o.getCompra().);
        int count = DataBase.instance().executeUpdate(stm);
        if (count == 0) {
            throw new Exception("El tiquete ya existe");
        }
    }

    public Tiquete read(int com) throws Exception {
        String sql = "select * from Tiquete where compra_id=?";
        PreparedStatement stm = DataBase.instance().prepareStatement(sql);
        stm.setInt(1, com);
        ResultSet rs = DataBase.instance().executeQuery(stm);
        if (rs.next()) {
            return from(rs);
        } else {
            throw new Exception("El usuario no Existe");
        }
    }

    public Tiquete from(ResultSet rs) {
        try {
            Tiquete r = new Tiquete(); //creamos el usuario
            r.setCodigo(rs.getString("codigo"));
            r.setCol(rs.getInt("col"));
            r.setFila(rs.getInt("Fila"));

            return r;
        } catch (SQLException ex) {
            return null;
        }
    }
    public List<Tiquete> tiquetesPorCompra(Compra com){
        List<Tiquete> tiquetes = new ArrayList<>();
        String sql = "select c.id_com idCompra, p.pelicula_Nombre NombreP, p.Date fechaPelicula ,s.Codigo codigoSala, t.compra_id idCompra from compra c, proyeccion p, sala s, tiquete t where t.compra_id = c.id_com=? AND "
                + "c.Proyeccion_id = p.pelicula_Nombre"
                + "AND p.Sala_id = s.id_sala";
        
        try{
             PreparedStatement stm = DataBase.instance().prepareStatement(sql);
             return null;
             
            
            
            
        }catch(Exception ex){
            return tiquetes;
        }
    }

}
