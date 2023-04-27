package br.com.kiman.curso.dominio.model.id;

import java.io.Serializable;
import java.util.Objects;

@SuppressWarnings("serial")
public class ItemPedidoId implements Serializable {

	private Long idPedido;
	private Long numItem;

	

	@Override
	public int hashCode() {
		return Objects.hash(idPedido, numItem);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ItemPedidoId other = (ItemPedidoId) obj;
		return Objects.equals(idPedido, other.idPedido) && Objects.equals(numItem, other.numItem);
	}

}
