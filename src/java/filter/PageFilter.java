package filter;

import Logic.Usuario;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@WebFilter(filterName = "PageFilter", urlPatterns = {"/*"})
public class PageFilter implements Filter {
    List<String> protectedPages;

    public PageFilter(){
        protectedPages = new ArrayList<>();
        protectedPages.add("/Cinema/web/presentation/cliente.html"); 
        protectedPages.add("/Cinema/web/presentation/administrador.html");
    }
    public void doFilter(ServletRequest request, ServletResponse response,FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpSession session = httpRequest.getSession(true);
        String recurso=httpRequest.getRequestURI();
        if (protectedPages.contains(recurso) && session.getAttribute("user")==null){
            request.getRequestDispatcher("/Cinema/web").forward( request, response);
        }
        if(protectedPages.contains(recurso) && session.getAttribute("user")!=null){
            Usuario usuario = (Usuario)request.getAttribute("user");
            if(usuario.getRol()!=1){
                 request.getRequestDispatcher("/Cinema/web/presentation/cliente.html").forward( request, response);
            }else{
                  chain.doFilter(request, response);
            }
        }
          
    }

    @Override
    public void init(FilterConfig fc) throws ServletException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void destroy() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
