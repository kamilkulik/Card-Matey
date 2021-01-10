import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { startLogout } from '../../actions/authActions'

const Navigation = () => {
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(startLogout())
  }

  return (
    <>
      <ul className='navigation'>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/add'>Create Card</Link>
        </li>
        <li>
          <button type='button' onClick={logout}>Logout</button>
        </li>
      </ul>
    </>
  )
}

export default Navigation
