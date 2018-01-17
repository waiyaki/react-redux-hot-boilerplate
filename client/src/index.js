import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import configureStore from './store';
import App from './App';

const store = configureStore();

const renderApp = (Component) => {
  render (
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById('root')
  )
}

// render App first
renderApp(App)

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./App.js', () => {
    const HotApp = require('./App').default;
    // render App on change
    renderApp(HotApp);
  });
}
