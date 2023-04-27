package br.com.kiman.curso.dominio.service;

import java.math.BigDecimal;
import java.util.Date;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import br.com.kiman.curso.dominio.DAO.ClienteDAO;
import br.com.kiman.curso.dominio.exception.ErroInfo;
import br.com.kiman.curso.dominio.model.Cliente;
import br.com.kiman.curso.dominio.model.ClienteInativo;

public class ClienteService {

	@Inject
	private ClienteDAO dao;

	@PersistenceContext
	EntityManager em;

	public Boolean validaCpf(Cliente c) {

		String cpf = c.getCPF();

		// VERIFICA SE O CPF É ÚNICO
		if (dao.listaCliente(cpf, null).isEmpty()) {

			// VERIFICAR SE O CPF É VÁLIDO
			BigDecimal resultado = (BigDecimal) em.createNativeQuery("select lmpolezel.VALIDA_CPF(:cpf) from dual")
					.setParameter("cpf", cpf).getSingleResult();

			if (resultado.compareTo(BigDecimal.ZERO) != 0) {
				return true;
			} else {
				new ErroInfo("cpf", "CPF inválido");
			}

		} else {
			new ErroInfo("cpf", "CPF já cadastrado!");
		}

		return false;
	}

	public void logCliente(Cliente c) {

		ClienteInativo i = new ClienteInativo();

		i.setCpf(c.getCPF());
		i.setNome(c.getNome());
		i.setIdCliente(c.getId());
		i.setDataInativacao(new Date(System.currentTimeMillis()));

		// insere objeto no log clientes
		em.merge(i);
	}
}