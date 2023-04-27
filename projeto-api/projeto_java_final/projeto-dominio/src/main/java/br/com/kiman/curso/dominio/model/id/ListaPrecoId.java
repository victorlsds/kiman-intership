package br.com.kiman.curso.dominio.model.id;

import java.io.Serializable;
import java.util.Objects;

@SuppressWarnings("serial")
public class ListaPrecoId implements Serializable {

	private Long idProduto;
	private Long cliente;

	public ListaPrecoId() {
	}

	public ListaPrecoId(Long idProduto, Long cliente) {
		this.idProduto = idProduto;
		this.cliente = cliente;
	}

	@Override
	public int hashCode() {
		return Objects.hash(cliente, idProduto);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ListaPrecoId other = (ListaPrecoId) obj;
		return Objects.equals(cliente, other.cliente) && Objects.equals(idProduto, other.idProduto);
	}

}
