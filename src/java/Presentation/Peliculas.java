package Presentation;

import Logic.Pelicula;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import Logic.Service;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.NotAcceptableException;
import javax.ws.rs.POST;
import javax.ws.rs.core.Response;
import org.glassfish.jersey.media.multipart.FormDataParam;

@Path("/Peliculas")

public class Peliculas{
    String location="C:/AAA/images/";
    @GET
    @Path("{peli}")
    @Produces({MediaType.APPLICATION_JSON})  
    @PermitAll
    public List<Pelicula> search(@DefaultValue("") @PathParam("peli") String nombre) {
        
        List<Pelicula> lp = Service.getInstance().filtrarNombrePeli(nombre);
        if(lp.isEmpty()){
            return Service.getInstance().devolverPeliculas();
        }else{
            return lp;
        }
    } 
    
    @GET
    @Path("listar")
    @PermitAll
    @Produces({MediaType.APPLICATION_JSON})
    public List<Pelicula> getPeliculas() {
        try {
           return Service.getInstance().devolverPeliculas();
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
     @GET
    @Path("{nombre}/imagen")
    @PermitAll
    @Produces("image/png")
    public Response getImge(@PathParam("nombre") String cedula) throws IOException {
        File file = new File(location+cedula);
        Response.ResponseBuilder response = Response.ok((Object) file);
        return response.build();
    }    
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON) 
     @RolesAllowed({"1"})  
    public void add(Pelicula p) {  
        try {
            Service.getInstance().agregarPelicula(p);
        } catch (Exception ex) {
            throw new NotAcceptableException(); 
        }
    }
    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA) 
     @RolesAllowed({"1"})  
    @Path("{nombre}/imagen")
    public void addImage(@PathParam("nombre") String cedula, @FormDataParam("imagen") InputStream imagenStream) {  
        try{
                int read = 0;
                byte[] bytes = new byte[1024];

                OutputStream out = new FileOutputStream(new File(location + cedula));
                while ((read = imagenStream.read(bytes)) != -1){out.write(bytes, 0, read);}
                out.flush();
                out.close();
            } catch (Exception ex) {
                throw new NotAcceptableException(); 
            }
    }

   @PUT
    @Consumes(MediaType.APPLICATION_JSON)
   @Produces({MediaType.APPLICATION_JSON})
    @RolesAllowed({"1"})  
    public List<Pelicula> update(Pelicula p) {  
        try {
            Service.getInstance().actualizarPelicula(p);
           
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
        return Service.getInstance().devolverPeliculas();
    }
    

}
