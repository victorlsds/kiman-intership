import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import { store } from '_redux/store';
import Routes from './routes';

import 'normalize.css';
import './sass/ant-local.css';
import './sass/global.scss';

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <Component />
      </AppContainer>
    </Provider>,
    document.getElementById('app')
  );
};

render(Routes);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('routes', () => {
    const HotRouters = require('./routes').default;
    render(HotRouters);
  });
}

