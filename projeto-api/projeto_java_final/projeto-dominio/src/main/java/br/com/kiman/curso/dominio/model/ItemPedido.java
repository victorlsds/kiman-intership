package br.com.kiman.curso.dominio.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import br.com.kiman.curso.dominio.model.id.ItemPedidoId;

@Entity
@IdClass(ItemPedidoId.class)
@Table(name = "item_pedido", schema = "lmpolezel")
public class ItemPedido {

	@Id
	@Column(name = "id_pedido")
	private Long idPedido;

	@Id
	@Column(name = "num_item")
	private Long numItem;

	@Column(name = "id_produto")
	private Long produto;

	// descrição

	@Column(name = "preco_unitario")
	private Double preco;

	@Column(name = "quantidade")
	private Long quantidade;

	public Long getIdPedido() {
		return idPedido;
	}

	public void setIdPedido(Long idPedido) {
		this.idPedido = idPedido;
	}

	public Long getNumItem() {
		return numItem;
	}

	public void setNumItem(Long numItem) {
		this.numItem = numItem;
	}

	public Long getProduto() {
		return produto;
	}

	public void setProduto(Long produto) {
		this.produto = produto;
	}

	public Double getPreco() {
		return preco;
	}

	public void setPreco(Double preco) {
		this.preco = preco;
	}

	public Long getQuantidade() {
		return quantidade;
	}

	public void setQuantidade(Long quantidade) {
		this.quantidade = quantidade;
	}

}
