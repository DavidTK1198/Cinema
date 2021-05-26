/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Logic;

import Data.UserDao;

/**
 *
 * @author Daniel Madrigal
 */
public class Service {
    public static int contador = 0;
       private static Service my_instance = null; //Singleton
    //private PDFMaker my_pdf;
    UserDao users;

    public Service() {
        users = new UserDao();
    }

    public static Service getInstance() {
        if (my_instance == null) {
            my_instance = new Service();
        }

        return my_instance;
    }
    public void agregarProyeccion(Proyeccion pr)throws Exception{
        
    }
}
