import {
  createStore, combineReducers, compose, applyMiddleware,
} from 'redux'
import thunkMiddleware from 'redux-thunk'
import cardReducer from '../reducers/cardReducer'
import loadingReducer from '../reducers/loadingReducer'
import authReducer from '../reducers/authReducer'
import { loadState } from './localStorage'

const rootReducer = combineReducers({
  cards: cardReducer,
  loading: loadingReducer,
  auth: authReducer,
})

const persistedState = loadState()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = () => {
  const reduxStore = createStore(
    rootReducer,
    persistedState,
    composeEnhancers(applyMiddleware(thunkMiddleware)),
  )
  return reduxStore
}

export default store
