import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage: React.FC = () => (
  <div className='not-Found'>
    <h1>404</h1>
    <Link to='/'><button type='button' className='button'>Go home</button></Link>
  </div>
)

export default NotFoundPage
