import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { startLogout } from '../../actions/authActions'

const Navigation = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const logout = () => {
    dispatch(startLogout())
    history.push('/')
  }

  return (
    <>
      <ul className='navigation'>
        <li>
          <Link to='/dashboard'>Home</Link>
        </li>
        <li>
          <Link to='/add'>Create Card</Link>
        </li>
      </ul>
      <button type='button' onClick={logout}>Logout</button>
    </>
  )
}

export default Navigation
