/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Data;

import Logic.Compra;
import Logic.Service;
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
        stm.setString(4, o.getCompra().getCodigo());
        int count = DataBase.instance().executeUpdate(stm);
        if (count == 0) {
            throw new Exception("El tiquete ya existe");
        }
    }

    public Tiquete read(String com) throws Exception {
        String sql = "select * from Tiquete where compra_id=?";
        PreparedStatement stm = DataBase.instance().prepareStatement(sql);
        stm.setString(1, com);
        ResultSet rs = DataBase.instance().executeQuery(stm);
        if (rs.next()) {
            return from(rs);
        } else {
            throw new Exception("El tiquete no existe");
        }
    }

    public Tiquete from(ResultSet rs) throws Exception {
        try {
            Tiquete r = new Tiquete(); //creamos el usuario
            r.setCol(rs.getInt("col"));
            r.setFila(rs.getInt("Fila"));
            Compra com = Service.getInstance().BuscarCompra(rs.getString("compra_id"));
            r.setCompra(com);
            return r;
        } catch (SQLException ex) {
            return null;
        }
    }

    public List<Tiquete> tiquetesPorCompra(List<Compra> com) {
        List<Tiquete> tiquetes = new ArrayList<>();
        for (Compra compra : com) {
            try {
                String sql = "select * from tiquete where compra_id = ?";
                PreparedStatement stm = DataBase.instance().prepareStatement(sql);
                stm.setString(1, compra.getCodigo());
                ResultSet rs = DataBase.instance().executeQuery(stm);
                if(rs.next()){
                    tiquetes.add(from(rs));
                }
            } catch (Exception ex) {
                return null;
            }
        }
        return tiquetes;
    }

}
