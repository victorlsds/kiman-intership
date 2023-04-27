package br.com.kiman.curso.dominio.DAO;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.FetchParent;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import br.com.kiman.curso.dominio.model.ItemPedido;
import br.com.kiman.curso.dominio.model.Pedido;

@Named
public class PedidoDAO {

	@PersistenceContext
	EntityManager em;

	// função para retornar a lista de pedidos/retornar pedido específico
	public List<Pedido> listaPedidos(Long idPedido, Long idProduto, Date dataMin, Date dataMax) {

		CriteriaBuilder builder = em.getCriteriaBuilder();
		CriteriaQuery<Pedido> query = builder.createQuery(Pedido.class);
		Root<Pedido> pedido = query.from(Pedido.class);
		FetchParent<Pedido, ItemPedido> fetch = pedido.fetch("ItemPedido", JoinType.LEFT);
		Join<Pedido, ItemPedido> itemPedido = (Join<Pedido, ItemPedido>) fetch;

		List<Predicate> predicates = new ArrayList();

		if (idPedido != null) {
			predicates.add(builder.equal(pedido.get("id"), idPedido));
		}
		if (idProduto != null) {
			predicates.add(builder.equal(itemPedido.get("produto"), idProduto));
		}
		
		
		//NÃO FUNCIONA -- CORRIGIR
		if (dataMin != null) {
			predicates.add(builder.ge(pedido.get("dataPedido"), (Expression<? extends Number>) dataMin));
		}
		if (dataMax != null) {
			predicates.add(builder.le(pedido.get("dataPedido"), (Expression<? extends Number>) dataMax));
		}
		

		query.distinct(true).where(predicates.stream().toArray(Predicate[]::new));
		TypedQuery<Pedido> q = em.createQuery(query);

		return q.getResultList();
	}

}
