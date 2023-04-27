package br.com.kiman.curso.spring.rest.resource;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;

@Path("hw")
@Consumes(value = { MediaType.APPLICATION_JSON })
public class DefaultController {

	@GET
	public String index() {
		return "Hello World";
	}

}
