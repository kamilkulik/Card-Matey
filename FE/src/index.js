import React from 'react'
import ReactDOM from 'react-dom'
import './styles/main.scss'
import { Provider } from 'react-redux'
// import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import App from './App'
import configureStore from './store/store'

const store = configureStore()

const jsx = (
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
)

// serviceWorkerRegistration.register()

ReactDOM.render(jsx, document.getElementById('root'))
