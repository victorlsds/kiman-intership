package br.com.kiman.curso.spring.rest.resource;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import br.com.kiman.curso.dominio.bean.PedidoBean;
import br.com.kiman.curso.dominio.model.Pedido;

@Path("pedido")
@Produces(value = { MediaType.APPLICATION_JSON })
@Consumes(value = { MediaType.APPLICATION_JSON })
public class PedidoController {

	@Inject
	private PedidoBean em;

	@GET
	@Path("/json")
	public Response listaPedidosJson() {

		List<Pedido> pedidos = em.listaPedidos(null, null, null, null);
		GenericEntity<List<Pedido>> lista = new GenericEntity<List<Pedido>>(pedidos) {
		};

		return Response.status(200).entity(lista).build();
	}

	@GET
	@Path("/cliente")
	public Response listaPedidosCliente() {

		List<Pedido> pedidos = em.listaPedidos(1l, null, null, null);
		GenericEntity<List<Pedido>> lista = new GenericEntity<List<Pedido>>(pedidos) {
		};

		return Response.status(200).entity(lista).build();
	}

	@GET
	@Path("/produto")
	public Response listaPedidosProduto() {

		List<Pedido> pedidos = em.listaPedidos(null, 1l, null, null);
		GenericEntity<List<Pedido>> lista = new GenericEntity<List<Pedido>>(pedidos) {
		};

		return Response.status(200).entity(lista).build();
	}

	@GET
	@Path("/intervalo")
	public Response listaPedidosIntervalo() throws ParseException {

		SimpleDateFormat format = new SimpleDateFormat("dd-MM-YYYY");

		String DataMin = "01-02-2021";
		String DataMax = "01-03-2021";

		Date minDate = format.parse(DataMin);
		Date maxDate = format.parse(DataMax);

		List<Pedido> pedidos = em.listaPedidos(null, null, minDate, maxDate);
		GenericEntity<List<Pedido>> lista = new GenericEntity<List<Pedido>>(pedidos) {
		};

		return Response.status(200).entity(lista).build();
	}

	@GET
	@Path("/pos")
	public Response listaPedidosPosteriores() throws ParseException {

		SimpleDateFormat format = new SimpleDateFormat("dd-MM-YYYY");
		String DataMin = "01-02-2021";
		Date minDate = format.parse(DataMin);

		List<Pedido> pedidos = em.listaPedidos(null, null, minDate, null);
		GenericEntity<List<Pedido>> lista = new GenericEntity<List<Pedido>>(pedidos) {
		};

		return Response.status(200).entity(lista).build();
	}

	@GET
	@Path("/ant")
	public Response listaPedidosAnteriores() throws ParseException {
		
		SimpleDateFormat format = new SimpleDateFormat("dd-MM-YYYY");
		String DataMax = "01-03-2021";
		Date maxDate = format.parse(DataMax);

		List<Pedido> pedidos = em.listaPedidos(null, null, null, maxDate);
		GenericEntity<List<Pedido>> lista = new GenericEntity<List<Pedido>>(pedidos) {
		};

		return Response.status(200).entity(lista).build();
	}

}
