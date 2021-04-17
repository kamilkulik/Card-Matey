/* eslint-disable no-mixed-operators */

import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import cardReducer from '../reducers/cardReducer';
import loadingReducer from '../reducers/loadingReducer';
import authReducer from '../reducers/authReducer';
import { loadState } from './localStorage';

const rootReducer = combineReducers({
  cards: cardReducer,
  loading: loadingReducer,
  auth: authReducer,
});

const persistedState = loadState();
const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ /*&& window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })*/ || compose;

const store = () => {
  return createStore(rootReducer, persistedState, composeEnhancers(applyMiddleware(thunkMiddleware)));
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export type RootState = ReturnType<typeof store>;

export default store;