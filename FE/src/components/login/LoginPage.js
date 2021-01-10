import React from 'react'
import { useDispatch } from 'react-redux'
import { startLogin } from '../../actions/authActions'

const LoginPage = () => {
  const dispatch = useDispatch()

  const login = () => {
    dispatch(startLogin())
  }
  return (
    <div>
      <div>
        <h1>Card Matey</h1>
        <button type='button' onClick={login}>Login with Google</button>
      </div>
    </div>
  )
}

export default LoginPage
