import { deleteProduto, getProdutos, getProduto, postProduto, putProduto } from 'services/produto';
import { showSuccess } from '_redux/modules/message';

const CARREGAR_PRODUTOS = 'kiman/administrativo/produto/CARREGAR_PRODUTOS';
const CARREGAR_PRODUTO = 'kiman/administrativo/produto/CARREGAR_PRODUTO';
const DELETAR_PRODUTO = 'kiman/administrativo/produto/DELETAR_PRODUTO';
const SALVAR_PRODUTO = 'kiman/administrativo/produto/SALVAR_PRODUTO';

// Define o estado inicial do reducer
const initialState = {
  produtos: [],
  produto: {}
};

// Define o reducer que irá processar as ações do Redux
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CARREGAR_PRODUTOS:
      return {
        ...state,
        produtos: action.payload
      };
    case CARREGAR_PRODUTO:
      return {
        ...state,
        produto: action.payload
      };
    case DELETAR_PRODUTO:
      return {
        ...state
      };
    case SALVAR_PRODUTO:
      const obj = {
        ...state,
        produto: action.payload
      }
      return obj;
    default:
      return state;
  }
}

// Define as actions do Redux

// Carrega a lista de produtos
export function carregarProdutos() {
  return dispatch => {
    getProdutos()
      .then(response => {
        dispatch({
          type: CARREGAR_PRODUTOS,
          payload: response.data
        });
      });
  };
}

// Carrega um produto específico
export function carregarProduto(id) {
  return dispatch => {
    getProduto(id)
      .then(response => {
        dispatch({
          type: CARREGAR_PRODUTO,
          payload: response.data
        });
      });
  };
}

// Cria um novo produto
export function criarProduto(produto) {
  return dispatch => {
    postProduto(produto)
      .then(response => {
        dispatch({
          type: SALVAR_PRODUTO,
          payload: response.data
        });

        // Atualiza a lista de produtos após a criação de um novo produto
        dispatch(carregarProdutos());

        // Mostra uma mensagem de sucesso para o usuário
        dispatch(showSuccess("Produto salvo com sucesso!"));
      }).catch(error => {
        return Promise.reject(error.response.data);
      });
  };
}

// Atualiza um produto existente
export function salvarProduto(id, produto) {
  return dispatch => {
    putProduto(id, produto)
      .then(response => {
        dispatch({
          type: SALVAR_PRODUTO,
          payload: response.data
        });

        dispatch(showSuccess("Produto salvo com sucesso!"));
      }).catch(error => {
        return Promise.reject(error.response.data);
      });
  };
}

// Remove um produto existente
export function removerProduto(id) {
  return dispatch => {
    deleteProduto(id)
      .then(response => {
        dispatch({
          type: DELETAR_PRODUTO,
          payload: response.data
        });

        dispatch(carregarProdutos());

        // Mostra uma mensagem de sucesso para o usuário
        dispatch(showSuccess("Produto removido com sucesso!"));
      }).catch(error => {
        return Promise.reject(error.response.data);
      });
  };
}
