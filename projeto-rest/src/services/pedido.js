import { getResource, postResource } from './utils';

export const getPedidos = (params = '') => getResource(`/pedido${params}`);

export const getPedido = id => getResource(`/pedido/${id}`);

// export const postPedido = body => postResource(`/pedido/`, body);