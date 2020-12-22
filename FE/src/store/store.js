import {
  createStore, combineReducers, compose, applyMiddleware,
} from 'redux'
import thunkMiddleware from 'redux-thunk'
import cardReducer from '../reducers/cardReducer'

const rootReducer = combineReducers({
  cards: cardReducer,
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
