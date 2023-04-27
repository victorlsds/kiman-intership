package br.com.kiman.curso.dominio.bean;

import java.util.Date;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;

import br.com.kiman.curso.dominio.DAO.PedidoDAO;
import br.com.kiman.curso.dominio.model.Pedido;

@Stateless
public class PedidoBean {

	@Inject
	private PedidoDAO dao;

//	@Inject
//	private PedidoService service;

	public List<Pedido> listaPedidos(Long idPedido, Long idProduto, Date dataMin, Date dataMax) {
		
		return dao.listaPedidos(idPedido, idProduto, dataMin, dataMax);
	}

}
