import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import './styles/main.scss'
import { Provider } from 'react-redux'
import App from './App'
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
const cachedThemes = []

let hasRendered = false
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('root'))
    hasRendered = true
    console.log(cachedThemes)
  }
}

ReactDOM.render(<p>Application Loading...</p>, document.getElementById('root'))

const setCards = store.dispatch(startSetCards())
const setThemes = axios.get('http://localhost:3700/themes')

Promise.all([setCards, setThemes])
  .then((values) => {
    const themes = values[1].data
    themes.forEach((theme) => cachedThemes.push(theme))
    renderApp()
  // if (history.location.pathname === '/') {
  //   history.push('/gallery')
  // }
  })

export default cachedThemes
