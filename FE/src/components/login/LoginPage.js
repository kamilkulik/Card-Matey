import React from 'react'
import { useDispatch } from 'react-redux'
import { startLogin } from '../../actions/authActions'
import video from './production ID_4435753.mp4'

const LoginPage = () => {
  const dispatch = useDispatch()

  const login = () => {
    dispatch(startLogin())
  }
  return (
    <div className='login-page'>
      <div className='bg-video'>
        <video className='bg-video__content' autoPlay muted loop>
          <source src={video} type='video/mp4' alt='Video by Edmond Dantès from Pexels' />
          Video by Edmond Dantès from Pexels. Your browser is not supported!
        </video>
      </div>
      <div className='login-page__box'>
        <h1>Card Matey</h1>
        <button className='button' type='button' onClick={login}>Login with Google</button>
      </div>
    </div>
  )
}

export default LoginPage
