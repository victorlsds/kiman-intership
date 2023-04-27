package br.com.kiman.curso.dominio.model;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;

@Entity
@Table(name = "Cliente", schema = "lmpolezel")
public class Cliente implements Serializable {

    @Id
    @GeneratedValue
	@Column(name = "id_cliente")
	private Long id;

	@Column(name = "CPF")
	private String CPF;

	@Column(name = "nome")
	@Size(min = 3)
	private String nome;

	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "id_cliente", referencedColumnName = "id_cliente")
	private Set<ListaPreco> ListaPreco = new HashSet<ListaPreco>();

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCPF() {
		return CPF;
	}

	public void setCPF(String cPF) {
		CPF = cPF;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Set<ListaPreco> getListaPreco() {
		return ListaPreco;
	}

	public void setListaPreco(Set<ListaPreco> listaPreco) {
		ListaPreco = listaPreco;
	}

}
