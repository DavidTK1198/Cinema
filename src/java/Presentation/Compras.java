package Presentation;

import Logic.Compra;
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
import Logic.Tiquete;
import Logic.Usuario;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Date;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.DELETE;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.NotAcceptableException;
import javax.ws.rs.POST;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import com.itextpdf.io.font.constants.StandardFonts;//hola
import com.itextpdf.io.image.ImageData;
import com.itextpdf.kernel.colors.Color;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.*;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.property.TextAlignment;
import java.io.*;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.layout.property.UnitValue;
import static javafx.scene.text.Font.font;

@Path("/Compras")
public class Compras {

    String path = "C:/AAA/";

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Path("{listarT}")
    public List<Tiquete> search(Proyeccion pr) {
        try {
            return Service.getInstance().cargaTiquets(pr);
        } catch (Exception ex) {
            throw new NotAcceptableException();
        }
    }

    //@GET
    //@Path("{cedula}")
    //@Produces({MediaType.APPLICATION_JSON})
    //public Persona get(@PathParam("cedula") String cedula) {
    // try {
    //   return Model.instance().personaEdit(cedula);
    //} catch (Exception ex) {
    //  throw new NotFoundException(); 
    //}
    //}
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void add(Compra p) {
        try {

            Service.getInstance().agregarUsuario(p.getUser());
            Service.getInstance().agregarCompra(p);

        } catch (Exception ex) {
            throw new NotAcceptableException();
        }
    }

    @POST
    @Path("tiquetes")
    @Consumes(MediaType.APPLICATION_JSON)
    public void lista(List<Tiquete> lt) {
        try {
            Service.getInstance().TiquetesAlaBase(lt);

        } catch (Exception ex) {
            throw new NotAcceptableException();
        }
    }

    @GET
    @Path("{com}/pdf")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces("application/pdf")
    public Response GenerarComprasAdmin(@PathParam("com") String n) throws IOException {
        try {
            int contador = 0;
            Compra c = Service.getInstance().BuscarCompra(n);
            List<Tiquete> lc = Service.getInstance().tiquetesPorCompraEspecifica(c);
            ByteArrayOutputStream salida = new ByteArrayOutputStream();
            PdfDocument pdfDoc = new PdfDocument(new PdfWriter(salida));
            PdfFont font = PdfFontFactory.createFont(StandardFonts.TIMES_ROMAN);
            Document document = new Document(pdfDoc);
            document.setMargins(20, 20, 20, 20);
            document.add(new Paragraph("Datos de la compra").setFont(font).setBold().setFontSize(12f).setTextAlignment(TextAlignment.RIGHT));
            document.add(new Paragraph(c.getP().toString()).setFont(font).setBold().setFontSize(12f).setTextAlignment(TextAlignment.RIGHT));
            document.add(new Paragraph("Codigo de la compra asignado: " + c.getCodigo()).setFont(font).setBold().setFontSize(12f).setTextAlignment(TextAlignment.RIGHT));
            document.add(new Paragraph("Numero de tiquetes comprados: " +lc.size()).setFont(font).setBold().setFontSize(12f).setTextAlignment(TextAlignment.RIGHT));
            document.add(new Paragraph("Precio designado por tiquete: " +c.getP().getPrecio()).setFont(font).setBold().setFontSize(12f).setTextAlignment(TextAlignment.RIGHT));
            document.add(new Paragraph("Lista de tiquetes asociados a la compras:").setFont(font).setBold().setFontSize(12f).setTextAlignment(TextAlignment.RIGHT));
            Table table = new Table(2);
            Color bkg = ColorConstants.BLUE;
            Color frg = ColorConstants.WHITE;
            Cell cc=new Cell();
            cc.add(new Paragraph("#Tiquete")).setBackgroundColor(bkg).setFontColor(frg);
            table.addHeaderCell(cc);
            cc=new Cell();
            cc.add(new Paragraph("#Asiento")).setBackgroundColor(bkg).setFontColor(frg);
            table.addHeaderCell(cc);
            for (Tiquete t : lc) {
                contador++;
                table.addHeaderCell(Integer.toString(contador));
                String asiento="("+Integer.toString(t.getFila())+","+Integer.toString(t.getCol())+")";
                table.addHeaderCell(asiento);
            }
            table.setWidth(UnitValue.createPercentValue(100));
            document.add(table);
            document.add(new Paragraph("Monto total cancelado: "+c.getTotal()));
            document.close();
            ByteArrayInputStream pdf = new ByteArrayInputStream(salida.toByteArray());
            Response.ResponseBuilder response = Response.ok().entity(pdf);
            response.header("Content-Disposition", "filename=datalle.pdf");
            return response.build();
           

        } catch (Exception ex) {
            return null;
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
*/

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    @Path("listarC")
    public List<Compra> todasLasCompras() { 
       return  Service.getInstance().compras_all();
 
    } 
     
}
