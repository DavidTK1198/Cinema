package Presentation;

import Logic.Sala;
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
import javax.ws.rs.core.Response;

@Path("/Salas")
public class Salas {

    @GET
    @Path("listar")
    @Produces({MediaType.APPLICATION_JSON})
    @PermitAll
    public List<Sala> getSalas() {
        try {
            return Service.getInstance().devolverSalas();
        } catch (Exception ex) {
            throw new NotFoundException();
        }
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
     @RolesAllowed({"1"})  
    public void add(Sala s) {
        try {
            if (s.getCol() > 9 || s.getFila() > 9) {
                throw new Exception("No se permite mas de 9 filas y 9 columnas");
            }
            Service.getInstance().agregarSala(s);

        } catch (Exception ex) {
       
            
            throw new NotAcceptableException(ex.getMessage());
        }
    }

}
