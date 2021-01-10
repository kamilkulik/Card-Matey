import React from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import firebase from './firebase/firebase'
import { login, logout } from './actions/authActions'
import { startSetCards } from './actions/cardActions'
import { fetching, fetched, fetchErr } from './actions/loadingActions'
import AppRouter from './router/AppRouter'
import ThemeContext from './ThemeContext'
import LoginPage from './components/login/LoginPage'

const App = () => {
  const dispatch = useDispatch()
  const [cachedThemes, setCachedThemes] = React.useState([])
  const isAuthenticated = useSelector((state) => state.auth.uid)
  const assetsLoaded = useSelector((state) => state.loading.status === 'FETCHED')

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // console.log(user.getAuthResponse().id_token)
        dispatch(fetching())
        const themes = axios.get('http://localhost:3700/themes')
        const userId = dispatch(login(user.uid))
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
      {isAuthenticated && assetsLoaded ? <AppRouter /> : <LoginPage />}
    </ThemeContext.Provider>
  )
}

export default App
