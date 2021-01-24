/* eslint-disable */

import React from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import firebase from './firebase/firebase'
// import { logout } from './actions/authActions'
import { startSetCards } from './actions/cardActions'
import { fetching, fetched, fetchErr } from './actions/loadingActions'
import AppRouter from './router/AppRouter'
import ThemeContext from './ThemeContext'
import { checkTimestampAge } from './hooks/useVerifyTimestamp'

const App = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const [cachedThemes, setCachedThemes] = React.useState([])

  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(() => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return firebase.auth().signInWithEmailAndPassword(email, password);
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user && checkTimestampAge(auth.timestamp)) {
        const idToken = await firebase.auth().currentUser.getIdToken(true)
        axios.defaults.headers.common.Authorization = idToken
        dispatch(fetching())
        const themes = axios.get('http://localhost:3700/themes')
        const cards = dispatch(startSetCards())
        Promise.all([themes, cards])
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
      }
    })
  }, [auth.timestamp])

  return (
    <ThemeContext.Provider value={cachedThemes}>
      <AppRouter />
    </ThemeContext.Provider>
  )
}

export default App
