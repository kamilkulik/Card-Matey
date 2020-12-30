import {
  createStore, combineReducers, compose, applyMiddleware,
} from 'redux'
import thunkMiddleware from 'redux-thunk'
import cardReducer from '../reducers/cardReducer'
import loadingReducer from '../reducers/loadingReducer'

const rootReducer = combineReducers({
  cards: cardReducer,
  loading: loadingReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = () => {
  const reduxStore = createStore(
    rootReducer,
    undefined,
    composeEnhancers(applyMiddleware(thunkMiddleware)),
  )
  return reduxStore
}

export default store
