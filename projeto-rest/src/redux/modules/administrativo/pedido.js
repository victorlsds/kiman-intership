import { deletePedido, getPedidos, getPedido } from 'services/pedido';
import { showSuccess } from '_redux/modules/message';

const CARREGAR_PEDIDOS = 'kiman/administrativo/pedido/CARREGAR_PEDIDOS';
const CARREGAR_PEDIDO = 'kiman/administrativo/pedido/CARREGAR_PEDIDO';

const initialState = {
  pedidos: [],
  pedido: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CARREGAR_PEDIDOS:
      return {
        ...state,
        pedidos: action.payload
      };
    case CARREGAR_PEDIDO:
      return {
        ...state,
        pedido: action.payload
      };
    default:
      return state;
  }
}

export const carregarPedidos = (params = '') =>
  dispatch => {
    getPedidos(params)
      .then(response => {
        dispatch({
          type: CARREGAR_PEDIDOS,
          payload: response.data
        })
      })
  } 

export function carregarPedido(id) {
  return dispatch => {
    getPedido(id)
      .then(response => {
        dispatch({
          type: CARREGAR_PEDIDO,
          payload: response.data
        });
      });
  };
}