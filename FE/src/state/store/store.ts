/* eslint-disable no-mixed-operators */

import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers';
import { loadState } from './localStorage';

const persistedState = loadState();
const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ /* && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }) */ || compose;

const store = () => {
  return createStore(reducers, persistedState, composeEnhancers(applyMiddleware(thunkMiddleware)));
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export default store;
