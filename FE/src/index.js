import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import './styles/main.scss'
import { Provider } from 'react-redux'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import App from './App'
import configureStore from './store/store'
import { startSetCards } from './actions/cardActions'

const store = configureStore()

const cachedThemes = []

const jsx = (
  <Provider store={store}>
    <React.StrictMode>
      <App cachedThemes={cachedThemes} />
    </React.StrictMode>
  </Provider>
)

// const updateHandler = () => {
//   if (window.confirm('Update available. Do you want to reload?')) {
//     window.location.reload()
//   }
// }

// serviceWorkerRegistration.register({
//   onUpdate: updateHandler,
// })

serviceWorkerRegistration.register()

let hasRendered = false
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('root'))
    hasRendered = true
  }
}

ReactDOM.render(<p>Application Loading...</p>, document.getElementById('root'))

const getAssets = () => {
  const setCards = store.dispatch(startSetCards())
  const setThemes = axios.get('http://localhost:3700/themes')
  Promise.all([setCards, setThemes])
    .then((values) => {
      const themes = values[1].data
      themes.forEach((theme) => cachedThemes.push(theme))
      renderApp()
    })
    .catch((error) => {
      let errorMessage
      if (!error.response) {
        // network error
        errorMessage = 'Error: Network error'
      } else {
        errorMessage = error.response.data.message
      }
      ReactDOM.render(<p>{errorMessage}</p>, document.getElementById('root'))
    })
}

getAssets()
