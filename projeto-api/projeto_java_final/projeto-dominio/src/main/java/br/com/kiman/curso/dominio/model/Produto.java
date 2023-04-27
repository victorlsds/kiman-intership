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

@SuppressWarnings("serial")
@Entity
@Table(name = "Produto", schema = "lmpolezel")
public class Produto implements Serializable {

	@Id
	@GeneratedValue
	@Column(name = "id_produto")
	private Long id;

	@Column(name = "descricao")
	@Size(min = 3)
	private String descricao;

	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "id_produto", referencedColumnName = "id_produto")
	private Set<ListaPreco> ListaPreco = new HashSet<ListaPreco>();

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public Set<ListaPreco> getListaPreco() {
		return ListaPreco;
	}

	public void setListaPreco(Set<ListaPreco> listaPreco) {
		ListaPreco = listaPreco;
	}

}
