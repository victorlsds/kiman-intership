import axios from 'axios';
import JWTDecode from 'jwt-decode';
import { addRequest, removeRequest } from '../redux/modules/loading';
import { getParam } from './utils';
import { store } from '_redux/store';
import { showError } from '_redux/modules/message';

function bearerConfig(config) {
  let accept = 'application/json';
  if ('blob' === config.responseType) {
    accept = config.headers.Accept;
  }
  config.headers.Accept = accept;
  config.headers.Authorization = `Bearer ${getParam('token')}`;
}

function initInterceptor() {
  axios.interceptors.request.use(config => {
    store.dispatch(addRequest());
    bearerConfig(config);
    return config;
  }, error => Promise.reject(error));
}

function responseInterceptor() {
  axios.interceptors.response.use(function (response) {
    store.dispatch(removeRequest());
    return response;
  }, function (error) {
    store.dispatch(removeRequest());
    let data = error.response.data;
    if (data instanceof Blob) {
      let reader = new FileReader();
      reader.onload = function () {
        logError(JSON.parse(reader.result), error);
      }
      reader.readAsText(data);
    } else {
      logError(data, error);
    }
    return Promise.reject(error);
  });
}

function logError(data, error) {
  let errorMessage = data.mensagem;
  store.dispatch(showError(errorMessage));
  if (error.response.status === 500) {
    console.error(data.erro);
  }
}

initInterceptor();

responseInterceptor();

export const interceptorService = {};
