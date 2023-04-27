import { deleteResource, getResource, postResource, putResource } from './utils';

export const getProdutos = () => getResource(`/produto`);

export const getProduto = id => getResource(`/produto/${id}`);

export const postProduto = body => postResource(`/produto`, body);

export const putProduto = (id, body) => putResource(`/produto/${id}`, body);

export const deleteProduto = id => deleteResource(`/produto/${id}`);
