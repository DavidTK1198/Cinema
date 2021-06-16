package Presentation;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import Logic.Service;
import Logic.Usuario;
import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.DELETE;
import javax.ws.rs.NotAcceptableException;
import javax.ws.rs.POST;
import javax.ws.rs.core.Context;

@Path("/usuarios")
@PermitAll
public class Usuarios {

    @Context
    HttpServletRequest request;
    private Usuario us = null;

   
    @POST
    @Consumes(MediaType.APPLICATION_JSON)  
    public void add(Usuario p) {
        try {
            us = Service.getInstance().buscarUsuario(p);
            if(us != null){
                throw new Exception("No es posible registrarse");
            }
            Service.getInstance().agregarUsuario(p);
        } catch (Exception ex) {
            throw new NotAcceptableException();
        }
    }

    @POST
    @Path("{login}")
   
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces({MediaType.APPLICATION_JSON})
    public Usuario login(Usuario p) {
        try {
            us = Service.getInstance().buscarUsuario(p);
            if(us == null){
                throw new Exception("Nombre o contrasenia invalidados");
            }
            request.getSession(true).setAttribute("user", us);
            return us;
        } catch (Exception ex) {
            throw new NotAcceptableException();
        }
    }

    @GET
    @Consumes(MediaType.APPLICATION_JSON)
    public Usuario getCurrent() {
        try {
            us=(Usuario)request.getSession(true).getAttribute("user");
            if (us == null) {
                throw new Exception();
            }
            return us;
        } catch (Exception ex) {
            throw new NotAcceptableException();
        }
    }

    @DELETE
    public void logout() {
        HttpSession session = request.getSession(true);
        session.removeAttribute("user");
        session.invalidate();
        us = null;
    }
     }
