import { combineReducers } from 'redux';
import authReducer from './authReducer';
import cardReducer from './authReducer';
import loadingReducer from './loadingReducer';

const reducers = combineReducers({
  cards: cardReducer,
  loading: loadingReducer,
  auth: authReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
