package br.com.kiman.curso.dominio.model;

import java.io.Serializable;
import java.util.Date;
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

@SuppressWarnings("serial")
@Entity
@Table(name = "Pedido", schema = "lmpolezel")
public class Pedido implements Serializable {

	@Id
	@GeneratedValue
	@Column(name = "id_pedido")
	private Long id;

	@Column(name = "id_cliente")
	private Long cliente;

	// id cliente

	// nome cliente

	// cpf cliente

	@Column(name = "data_pedido")
	private Date dataPedido;

	@Column(name = "data_entrega")
	private Date dataEntrega;

	// valor total

	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "id_pedido", referencedColumnName = "id_pedido")
	private Set<ItemPedido> ItemPedido;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getCliente() {
		return cliente;
	}

	public void setCliente(Long cliente) {
		this.cliente = cliente;
	}

	public Date getDataPedido() {
		return dataPedido;
	}

	public void setDataPedido(Date dataPedido) {
		this.dataPedido = dataPedido;
	}

	public Date getDataEntrega() {
		return dataEntrega;
	}

	public void setDataEntrega(Date dataEntrega) {
		this.dataEntrega = dataEntrega;
	}

	public Set<ItemPedido> getItemPedido() {
		return ItemPedido;
	}

	public void setItemPedido(Set<ItemPedido> itemPedido) {
		ItemPedido = itemPedido;
	}

}
