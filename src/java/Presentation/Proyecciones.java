package Presentation;

import Logic.Proyeccion;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import Logic.Service;
import java.util.ArrayList;
import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.DELETE;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.NotAcceptableException;
import javax.ws.rs.POST;
import javax.ws.rs.core.Context;

@Path("/Proyecciones")
public class Proyecciones{
     
  
    @GET
    @Path("listar")
    @Produces({MediaType.APPLICATION_JSON})
    @PermitAll
    public List<Proyeccion> get() {
        try {
           return Service.getInstance().devolverProyecciones();
        } catch (Exception ex) {
           throw new NotFoundException(); 
        }
    }
    @GET
    @Path("{nombre}")
    @Produces({MediaType.APPLICATION_JSON})
    @PermitAll
    public List<Proyeccion> get2(@PathParam("nombre") String nombre) {
        try {
           return Service.getInstance().devolverProyeccionesPorNombre(nombre);
        } catch (Exception ex) {
           throw new NotFoundException(); 
        }
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON) 
    @RolesAllowed({"1"})  
    public void add(Proyeccion p) {  
        try {
            Service.getInstance().agregarProyeccion(p);
        } catch (Exception ex) {
            throw new NotAcceptableException(); 
        }
    }

}
