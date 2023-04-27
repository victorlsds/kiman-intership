package br.com.kiman.curso.dominio.DAO;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.FetchParent;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import br.com.kiman.curso.dominio.model.ListaPreco;
import br.com.kiman.curso.dominio.model.Produto;

@Named
public class ProdutoDAO {

	@PersistenceContext
	EntityManager em;

	// função para retornar a lista de produtos/retornar produto específico
	public List<Produto> listaProduto(String descricao) {

		CriteriaBuilder builder = em.getCriteriaBuilder();
		CriteriaQuery<Produto> query = builder.createQuery(Produto.class);
		Root<Produto> produto = query.from(Produto.class);
		FetchParent<Produto, ListaPreco> fetch = produto.fetch("ListaPreco", JoinType.LEFT);
		Join<Produto, ListaPreco> listaPreco = (Join<Produto, ListaPreco>) fetch;

		List<Predicate> predicates = new ArrayList();

		if (descricao != null) {
			predicates.add(builder.like(produto.get("descricao"), descricao));
			query.distinct(true).where(predicates.stream().toArray(Predicate[]::new));
			TypedQuery<Produto> q = em.createQuery(query);

			return q.getResultList();
		}

		TypedQuery<Produto> q = em.createQuery(query);

		return q.getResultList();
	}

	public Produto buscaById(Long id) {

		CriteriaBuilder builder = em.getCriteriaBuilder();
		CriteriaQuery<Produto> query = builder.createQuery(Produto.class);
		Root<Produto> produto = query.from(Produto.class);
		FetchParent<Produto, ListaPreco> fetch = produto.fetch("ListaPreco", JoinType.LEFT);
		Join<Produto, ListaPreco> listaPreco = (Join<Produto, ListaPreco>) fetch;

		List<Predicate> predicates = new ArrayList();

		predicates.add(builder.equal(produto.get("id"), id));
		query.distinct(true).where(predicates.stream().toArray(Predicate[]::new));
		TypedQuery<Produto> q = em.createQuery(query);

		return q.getSingleResult();

	}

	// criar produto
	public Produto insert(Produto p) {
		return em.merge(p);
	}

	// deletar produto
	public void delete(Produto p) {
		em.remove(p);
	}

	// alterar produto
	public void update(Produto p) {
		em.merge(p);
	}

}
