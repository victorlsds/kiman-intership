import { deleteResource, getResource, postResource, putResource } from './utils';

export const getClientes = (params = '') => getResource(`/cliente${params}`);

// export const getClientes = () => getResource(`/cliente`);

export const getCliente = id => getResource(`/cliente/${id}`);

export const postCliente = body => postResource(`/cliente`, body);

export const putCliente = (id, body) => putResource(`/cliente/${id}`, body);

export const deleteCliente = id => deleteResource(`/cliente/${id}`);

export const getClientList = id => getResource(`/cliente/${id}/listaPreco`);

export const putClientList = (id, body) => putResource(`/cliente/${id}/listaPreco`, body);