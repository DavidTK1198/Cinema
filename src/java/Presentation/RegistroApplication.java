package Presentation;
import filter.RestfulFilter;
import java.util.HashSet;
import java.util.Set;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import org.glassfish.jersey.media.multipart.MultiPartFeature;

@ApplicationPath("api")
public class RegistroApplication extends Application {
    @Override
    public Set<Class<?>> getClasses() {

        HashSet<Class<?>> classes = new HashSet<>();
        classes.add(MultiPartFeature.class);
        System.out.println("added multipart feature");
        classes.add(Peliculas.class);
        classes.add(Usuarios.class);
        classes.add(Salas.class);
        classes.add(Proyecciones.class);
        classes.add(Compras.class);
        classes.add(RestfulFilter.class);
        classes.add(MultiPartFeature.class);
        return classes;
    }   
}