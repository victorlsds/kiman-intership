package br.com.kiman.curso.dominio.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Entity
@Table(name = "logClientes", schema = "lmpolezel")
public class ClienteInativo implements Serializable {

	@Id
	@GeneratedValue
	@Column(name = "id_log")
	private Long id;

	@Column(name = "id_cliente")
	private Long idCliente;

	@Column(name = "nome")
	private String nome;

	@Column(name = "CPF")
	private String cpf;

	@Column(name = "data_inativado")
	private Date dataInativacao;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getIdCliente() {
		return idCliente;
	}

	public void setIdCliente(Long idCliente) {
		this.idCliente = idCliente;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public Date getDataInativacao() {
		return dataInativacao;
	}

	public void setDataInativacao(Date dataInativacao) {
		this.dataInativacao = dataInativacao;
	}

}
