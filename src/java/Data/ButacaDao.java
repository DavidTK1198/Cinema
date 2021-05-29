/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Data;
import java.sql.PreparedStatement;
import Logic.Butaca;
/**
 *
 * @author DavidTK1198
 */
public class ButacaDao {
    public void create(Butaca o) throws Exception {
        String sql = "insert into Butaca (Fila,col)"
                + "values(?,?)";
        PreparedStatement stm = DataBase.instance().prepareStatement(sql);
        stm.setInt(1, o.getFila());
        stm.setInt(2, o.getCol());
        int count = DataBase.instance().executeUpdate(stm);
        if (count == 0) {
            throw new Exception("La butaca ya existe");
        }
    }
     
}
