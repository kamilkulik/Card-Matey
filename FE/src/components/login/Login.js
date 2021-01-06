import React from 'react'
import useGoogleLogin from '../../hooks/useGoogleLogin'

const Login = () => {
  const { loaded } = useGoogleLogin()

  return (
    <>
      {loaded && <div className="g-signin2" data-onsuccess="onSignIn" />}
    </>
  )
}

export default Login
