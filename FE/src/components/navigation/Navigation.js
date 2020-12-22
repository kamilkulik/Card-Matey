import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => (
  <ul className='navigation'>
    <li>
      <Link to='/'>Home</Link>
    </li>
    <li>
      <Link to='/add'>Create Card</Link>
    </li>
  </ul>
)

export default Navigation
