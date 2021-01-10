/* eslint-disable */

import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

const PublicRoute = ({ children, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.uid)

  return (
    <Route
      {...rest}
      render={() => (
        isAuthenticated ? (
          <Redirect to='/dashboard' />
        ) : (
          children
        )
      )}
    />
  )
}

PublicRoute.propTypes = {
  children: PropTypes.element,
}

export default PublicRoute
