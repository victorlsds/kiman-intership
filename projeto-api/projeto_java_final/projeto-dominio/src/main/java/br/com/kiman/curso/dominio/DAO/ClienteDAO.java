package br.com.kiman.curso.dominio.DAO;

import java.util.ArrayList;
import java.util.List;

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

import br.com.kiman.curso.dominio.model.Cliente;
import br.com.kiman.curso.dominio.model.ListaPreco;

public class ClienteDAO {

	@PersistenceContext
	EntityManager em;

	// função para retornar a lista de clientes/retornar cliente específico
	public List<Cliente> listaCliente(String cpf, String nome) {

		CriteriaBuilder builder = em.getCriteriaBuilder();
		CriteriaQuery<Cliente> query = builder.createQuery(Cliente.class);
		Root<Cliente> cliente = query.from(Cliente.class);
		FetchParent<Cliente, ListaPreco> fetch = cliente.fetch("ListaPreco", JoinType.LEFT);
		Join<Cliente, ListaPreco> listaPreco = (Join<Cliente, ListaPreco>) fetch;

		List<Predicate> predicates = new ArrayList();

		if (cpf != null) {
			predicates.add(builder.like(cliente.get("CPF"), cpf));

		}
		if (nome != null) {
			predicates.add(builder.like(cliente.get("nome"), nome));
		}

		query.distinct(true).where(predicates.stream().toArray(Predicate[]::new));
		TypedQuery<Cliente> q = em.createQuery(query);

		
		return q.getResultList();
	}

	// busca pelo id (utilizado para exclusões)
	public Cliente buscaId(Long id) {
		CriteriaBuilder builder = em.getCriteriaBuilder();
		CriteriaQuery<Cliente> query = builder.createQuery(Cliente.class);
		Root<Cliente> cliente = query.from(Cliente.class);
		FetchParent<Cliente, ListaPreco> fetch = cliente.fetch("ListaPreco", JoinType.LEFT);
		Join<Cliente, ListaPreco> listaPreco = (Join<Cliente, ListaPreco>) fetch;
		query.select(cliente).where(builder.equal(cliente.get("id"), id));
		TypedQuery<Cliente> q = em.createQuery(query);
		return q.getSingleResult();
	}

	// criar cliente
	public Cliente insert(Cliente c) {
		return em.merge(c);
	}

	// alterar cliente
	public void update(Cliente c) {
		em.merge(c);
	}

	// deleta/inativa cliente
	public void delete(Cliente c) {
		em.remove(c);
	}

}

//EXEMPLO DE FETCH PARA DEPOIS 
//FetchParent<Cliente, Pedido> fetch = cliente.fetch("Pedido", JoinType.LEFT);
//Join<Cliente, Pedido> Pedido = (Join<Cliente, Autor>) fetch;