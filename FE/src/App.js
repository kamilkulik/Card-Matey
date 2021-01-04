import React from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { fetching, fetched, fetchErr } from './actions/loadingActions'
import AppRouter from './router/AppRouter'
import ThemeContext from './ThemeContext'
import { startSetCards } from './actions/cardActions'
import useGoogleLogin from './hooks/useGoogleLogin'

const App = () => {
  const dispatch = useDispatch()
  const [cachedThemes, setCachedThemes] = React.useState([])

  useGoogleLogin()

  React.useEffect(() => {
    dispatch(fetching())
    const setCards = dispatch(startSetCards())
    const setThemes = axios.get('http://localhost:3700/themes')
    Promise.all([setCards, setThemes])
      .then((values) => {
        const themes = values[1].data
        setCachedThemes(themes)
        dispatch(fetched())
      })
      .catch((error) => {
        let errorMessage
        if (!error.response) {
          // network error
          errorMessage = 'Error: Network error'
        } else {
          errorMessage = error.response.data.message
        }
        dispatch(fetchErr(errorMessage))
      })
  }, [])

  return (
    <ThemeContext.Provider value={cachedThemes}>
      <AppRouter />
    </ThemeContext.Provider>
  )
}

export default App
