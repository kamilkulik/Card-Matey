/* eslint-disable arrow-body-style */

import firebase, { googleAuthProvider } from '../firebase/firebase'

export const refreshToken = () => ({
  type: 'REFRESH_TOKEN',
})

export const login = (uid) => ({
  type: 'LOGIN',
  uid,
})

export const logout = () => ({
  type: 'LOGOUT',
})

export const startLogin = () => {
  return (dispatch) => {
    firebase.auth().signInWithPopup(googleAuthProvider)
      .then((result) => {
        const user = result.user.uid
        if (user) {
          return dispatch(login(user))
        }
        return dispatch(logout())
      })
      .catch((error) => {
        console.log(error.message)
      })
  }
}

export const startLogout = () => {
  return (dispatch) => {
    return firebase.auth().signOut()
      .then(() => {
        return dispatch(logout())
      })
  }
}
