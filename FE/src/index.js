import React from 'react'
import ReactDOM from 'react-dom'
import './styles/main.scss'
import App from './App'
import { Provider } from 'react-redux'
import configureStore from './store/store'
import { startSetCards } from './actions/cardActions'

const store = configureStore()

const jsx = (
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
)

let hasRendered = false
function renderApp() {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('root'))
    hasRendered = true
  }
}

ReactDOM.render(<p>Application Loading...</p>, document.getElementById('root'))

store.dispatch(startSetCards()).then(() => {
  renderApp()
  // if (history.location.pathname === '/') {
  //   history.push('/gallery')
  // }
})
