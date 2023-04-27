import { combineReducers } from 'redux';

import { produto, cliente, pedido } from './administrativo';

import interceptor from './interceptor';
import loading from './loading';
import menu from './menu';
import message from './message';
import pdfviewer from './pdfviewer';

const administrativo = combineReducers({
  produto,
  cliente,
  pedido
});

export default asyncReducers =>
  combineReducers({
    administrativo,
    interceptor,
    loading,
    menu,
    message,
    pdfviewer
  });
