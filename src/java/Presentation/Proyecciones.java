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
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.DELETE;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.NotAcceptableException;
import javax.ws.rs.POST;
import javax.ws.rs.core.Context;

@Path("/Proyecciones")
public class Proyecciones{
     
   // @GET
    //@Produces({MediaType.APPLICATION_JSON})
    //public List<Persona> search(@DefaultValue("") @QueryParam("nombre") String nombre) { 
     //   return Model.instance().personaSearch(nombre);
    //} 
    
    @GET
    @Path("listar")
    @Produces({MediaType.APPLICATION_JSON})
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
    public List<Proyeccion> get2(@PathParam("nombre") String nombre) {
        try {
           return Service.getInstance().devolverProyeccionesPorNombre(nombre);
        } catch (Exception ex) {
           throw new NotFoundException(); 
        }
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON) 
    public void add(Proyeccion p) {  
        try {
            Service.getInstance().agregarProyeccion(p);
        } catch (Exception ex) {
            throw new NotAcceptableException(); 
        }
    }

   /* @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public void update(Persona p) {  
        try {
            Model.instance().personaUpdate(p);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    

    @DELETE
    @Path("{cedula}")
    public void del(@PathParam("cedula") String cedula) {
        try {
            Model.instance().personaDelete(cedula);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    @Path("mujeres")
    public List<Persona> searchMujeres() { 
        List<Persona> todos=Model.instance().personaSearch("");
        List<Persona> mujeres = new ArrayList<>();
        for(Persona p: todos){ if(p.getSexo().equals("F")) mujeres.add(p);};
        return mujeres;
    }  
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces({MediaType.APPLICATION_JSON})  
    @Path("filtrar")    
    public List<Persona> filtrar(Persona filtro) {  
        List<Persona> todos=Model.instance().personaSearch("");
        List<Persona> filtrados = new ArrayList<>();
        for(Persona p: todos){ 
            if (    p.getCedula().contains(filtro.getCedula())
                  && p.getNombre().contains(filtro.getNombre())
                  && p.getSexo().contains(filtro.getSexo()))  filtrados.add(p);
        };
        return filtrados;
    } 
*/
}
