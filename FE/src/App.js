import React from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import firebase from './firebase/firebase'
import { login, logout } from './actions/authActions'
import { startSetCards } from './actions/cardActions'
import { fetching, fetched, fetchErr } from './actions/loadingActions'
import AppRouter from './router/AppRouter'
import ThemeContext from './ThemeContext'

const App = () => {
  const dispatch = useDispatch()
  const [cachedThemes, setCachedThemes] = React.useState([])

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const idToken = await firebase.auth().currentUser.getIdToken(true)
        axios.defaults.headers.common.Authorization = idToken
        dispatch(fetching())
        const userId = dispatch(login(user.uid))
        const themes = axios.get('http://localhost:3700/themes')
        const cards = dispatch(startSetCards())
        Promise.all([themes, userId, cards])
          .then((res) => {
            const themesArray = res[0].data
            setCachedThemes(themesArray)
            dispatch(fetched())
          })
          .catch((error) => {
            let errorMessage
            if (!error.response) {
              errorMessage = 'Error: Network error'
            } else {
              errorMessage = error.response.data.message
            }
            dispatch(fetchErr(errorMessage))
          })
      } else {
        dispatch(logout())
      }
    })
  }, [])

  return (
    <ThemeContext.Provider value={cachedThemes}>
      <AppRouter />
    </ThemeContext.Provider>
  )
}

export default App
