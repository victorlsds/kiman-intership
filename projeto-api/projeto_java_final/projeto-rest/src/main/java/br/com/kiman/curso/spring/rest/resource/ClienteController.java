package br.com.kiman.curso.spring.rest.resource;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import br.com.kiman.curso.dominio.bean.ClienteBean;
import br.com.kiman.curso.dominio.model.Cliente;

@Path("cliente")
@Produces(value = { MediaType.APPLICATION_JSON })
@Consumes(value = { MediaType.APPLICATION_JSON })
public class ClienteController {

	@Inject
	private ClienteBean em;

	@GET
	@Path("/json")
	public Response listaClienteJson() {

		List<Cliente> clientes = em.listaCliente(null, null);
		GenericEntity<List<Cliente>> lista = new GenericEntity<List<Cliente>>(clientes) {
		};

		return Response.status(200).entity(lista).build();

	}

	@GET
	@Path("/cpf")
	public Response listaClienteCPF() {

		List<Cliente> clientes = em.listaCliente("748.556.042-59", null);
		GenericEntity<List<Cliente>> lista = new GenericEntity<List<Cliente>>(clientes) {
		};

		return Response.status(200).entity(lista).build();
	}

	@GET
	@Path("/nome")
	public Response listaClienteNome() {

		List<Cliente> clientes = em.listaCliente(null, "Cliente 1");
		GenericEntity<List<Cliente>> lista = new GenericEntity<List<Cliente>>(clientes) {
		};

		return Response.status(200).entity(lista).build();
	}

	@POST
	@Path("/postCPF")
	public Response postCPF(Cliente c) {

		em.insert(c);

		return Response.status(200).entity(c).build();
	}

	@GET
	@Path("/id/{id}")
	public Response buscaClienteId(@PathParam("id") Long id) {
		
		Cliente c = em.buscaClienteId(id);

		return Response.status(200).entity(c).build();
	}

	@DELETE
	@Path("/delete/{id}")
	public Response deleteCliente(@PathParam("id") Long id) {

		em.delete(id);

		return Response.status(200).entity("Livro deletado!").build();
	}

}
