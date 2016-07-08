import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';

import '../public/main.css';
import configureStore from './store';
import Root from './containers/Root';

const store = configureStore();

render(
  <Root store={store} />,
  document.getElementById('root')
);

if (process.env.NODE_ENV !== 'production') {
  module.hot.accept();
}
