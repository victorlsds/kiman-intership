package br.com.kiman.curso.spring.rest.resource;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import br.com.kiman.curso.dominio.bean.ProdutoBean;
import br.com.kiman.curso.dominio.model.Produto;

@Path("produto")
@Produces(value = { MediaType.APPLICATION_JSON })
@Consumes(value = { MediaType.APPLICATION_JSON })
public class ProdutoController {

	@Inject
	private ProdutoBean em;

	@GET
	@Path("/json")
	public Response listaProdutoJson() {

		List<Produto> produtos = em.listaProduto(null);

		GenericEntity<List<Produto>> lista = new GenericEntity<List<Produto>>(produtos) {
		};

		return Response.status(200).entity(lista).build();
	}

	@GET
	@Path("/desc")
	public Response listaProdutoDesc() {

		List<Produto> produtos = em.listaProduto("Produto 1");

		GenericEntity<List<Produto>> lista = new GenericEntity<List<Produto>>(produtos) {
		};

		return Response.status(200).entity(lista).build();
	}
	
	@GET
	@Path("/id/{id}")
	public Response buscaById(@PathParam("id") Long id) {

		Produto p = em.buscaById(1l);

		return Response.status(200).entity(p).build();
	}

}
