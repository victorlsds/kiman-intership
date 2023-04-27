package br.com.kiman.curso.dominio.bean;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;

import br.com.kiman.curso.dominio.DAO.ClienteDAO;
import br.com.kiman.curso.dominio.model.Cliente;
import br.com.kiman.curso.dominio.service.ClienteService;

@Stateless
public class ClienteBean {

	@Inject
	private ClienteDAO dao;

	@Inject
	private ClienteService service;

	public List<Cliente> listaCliente(String cpf, String nome) {

		return dao.listaCliente(cpf, nome);
	}

	public Cliente buscaClienteId(Long id) {

		return dao.buscaId(id);
	}

	public Cliente insert(Cliente c) {

		if (service.validaCpf(c) == true) {
			return dao.insert(c);
		}
		return null;
	}

	public void update(Cliente c) {

		if (service.validaCpf(c) == true) {
			dao.update(c);
		}
	}

	public void delete(Long id) {

		Cliente c = dao.buscaId(id); // busca o cliente
		service.logCliente(c); // salva no log de clientes inativados
		dao.delete(c); // deleta o cliente
	}

}
