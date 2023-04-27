package br.com.kiman.curso.dominio.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import br.com.kiman.curso.dominio.model.id.ListaPrecoId;

@Entity
@IdClass(ListaPrecoId.class)
@Table(name = "lista_preco", schema = "lmpolezel")
public class ListaPreco {

	@Id
	@Column(name = "id_produto")
	private Long idProduto;

	@Id
	@Column(name = "id_cliente")
	private Long cliente;

	@Column(name = "preco_unitario")
	private Double precoUnitario;

	public Long getIdProduto() {
		return idProduto;
	}

	public void setIdProduto(Long idProduto) {
		this.idProduto = idProduto;
	}

	public Long getCliente() {
		return cliente;
	}

	public void setCliente(Long cliente) {
		this.cliente = cliente;
	}

	public Double getPrecoUnitario() {
		return precoUnitario;
	}

	public void setPrecoUnitario(Double precoUnitario) {
		this.precoUnitario = precoUnitario;
	}

}
