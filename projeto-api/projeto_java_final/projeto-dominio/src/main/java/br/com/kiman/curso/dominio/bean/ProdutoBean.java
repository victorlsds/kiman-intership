package br.com.kiman.curso.dominio.bean;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;

import br.com.kiman.curso.dominio.DAO.ProdutoDAO;
import br.com.kiman.curso.dominio.model.Produto;

@Stateless
public class ProdutoBean {

	@Inject
	private ProdutoDAO dao;

	public List<Produto> listaProduto(String desc) {

		return dao.listaProduto(desc);
	}
	
	public Produto buscaById(Long id) {

		return dao.buscaById(id);
	}

	public Produto insert(Produto p) {

		return dao.insert(p);
	}

	public void update(Produto p) {

		dao.update(p);
	}

	public void delete(Produto p) {

		dao.delete(p);
	}

}
