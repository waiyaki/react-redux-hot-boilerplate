import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './modules';

let composeEnhancers = compose;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line no-underscore-dangle
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

export default function configureStore(initialState) {
  const enhancer = composeEnhancers(applyMiddleware(thunkMiddleware));
  const store = createStore(rootReducer, initialState, enhancer);


  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./modules', () => {
      /* eslint-disable global-require */
      const nextReducer = require('./modules').default;
      /* eslint-enable global-require */
      store.replaceReducer(nextReducer);
    });
  }
  return store;
}
