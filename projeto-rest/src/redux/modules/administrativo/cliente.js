import { deleteCliente, getClientes, getCliente, postCliente, putCliente, getClientList } from 'services/cliente';
import { showSuccess } from '_redux/modules/message';

const CARREGAR_CLIENTES = 'kiman/administrativo/cliente/CARREGAR_CLIENTES';
const CARREGAR_CLIENTE = 'kiman/administrativo/cliente/CARREGAR_CLIENTE';
const DELETAR_CLIENTE = 'kiman/administrativo/cliente/DELETAR_CLIENTE';
const SALVAR_CLIENTE = 'kiman/administrativo/cliente/SALVAR_CLIENTE';
const CLIENTE_LISTA_PRECO = 'kiman/administrativo/cliente/CARREGAR_CLIENTE_LISTA';

const initialState = {
  clientes: [],
  cliente: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CARREGAR_CLIENTES:
      return {
        ...state,
        clientes: action.payload
      };
    case CARREGAR_CLIENTE:
      return {
        ...state,
        cliente: action.payload
      };
    case DELETAR_CLIENTE:
      return {
        ...state
      };
    case SALVAR_CLIENTE:
      const obj = {
        ...state,
        cliente: action.payload
      }
    case CLIENTE_LISTA_PRECO:
      return {
        ...state,
        cliente: action.payload
      };
    default:
      return state;
  }
}

export function carregarClientes() {
  return dispatch => {
    getClientes()
      .then(response => {
        dispatch({
          type: CARREGAR_CLIENTES,
          payload: response.data
        });
      });
  };
}

export function carregarCliente(id) {
  return dispatch => {
    getCliente(id)
      .then(response => {
        dispatch({
          type: CARREGAR_CLIENTE,
          payload: response.data
        });
      });
  };
}

export function criarCliente(cliente) {
  return dispatch => {
    postCliente(cliente)
      .then(response => {
        dispatch({
          type: SALVAR_CLIENTE,
          payload: response.data
        });
        dispatch(carregarClientes());
        dispatch(showSuccess("Cliente salvo com sucesso!"));
      }).catch(error => {
        return Promise.reject(error.response.data);
      });
  };
}

export function salvarCliente(id, cliente) {
  return dispatch => {
    putCliente(id, cliente)
      .then(response => {
        dispatch({
          type: SALVAR_CLIENTE,
          payload: response.data
        });
        dispatch(showSuccess("Cliente salvo com sucesso!"));
      }).catch(error => {
        return Promise.reject(error.response.data);
      });
  };
}

export function removerCliente(id) {
  return dispatch => {
    deleteCliente(id)
      .then(response => {
        dispatch({
          type: DELETAR_CLIENTE,
          payload: response.data
        });
        dispatch(carregarClientes());
        dispatch(showSuccess("Cliente removido com sucesso!"));
      }).catch(error => {
        return Promise.reject(error.response.data);
      });
  };
}

export const carregarClienteLista = id =>
  dispatch => {
    if (!id) {
      dispatch({ type: CARREGAR_CLIENTE, payload: {} });
      return;
    }
    getClientList(id)
      .then(response => {
        dispatch({
          type: CLIENTE_LISTA_PRECO,
          payload: response.data
        })
      })
  }

export const enviarClienteLista = (id, cliente, param = null) =>
  dispatch => {
    putClientList(id, cliente)
      .then(response => {
        dispatch({
          type: SALVAR_CLIENTE,
          payload: response.data
        })
        if (param) {
         param()
        }
      })
      .catch(error => Promise.reject(error.response.data));
  }