package br.com.kiman.curso.spring.rest.config;

import java.util.Set;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@ApplicationPath("app")
public class Config extends Application {
	@Override
	public Set<Class<?>> getClasses() {
		Set<Class<?>> resources = new java.util.HashSet<>();
		resources.add(br.com.kiman.curso.dominio.model.Cliente.class);
		resources.add(br.com.kiman.curso.dominio.model.ClienteInativo.class);
		resources.add(br.com.kiman.curso.dominio.model.Produto.class);
		resources.add(br.com.kiman.curso.dominio.model.ListaPreco.class);
		resources.add(br.com.kiman.curso.dominio.model.Pedido.class);
		resources.add(br.com.kiman.curso.dominio.model.ItemPedido.class);
		resources.add(br.com.kiman.curso.spring.rest.resource.DefaultController.class);
		resources.add(br.com.kiman.curso.spring.rest.resource.ClienteController.class);
		resources.add(br.com.kiman.curso.spring.rest.resource.ProdutoController.class);
		resources.add(br.com.kiman.curso.spring.rest.resource.PedidoController.class);
		return resources;
	}
}