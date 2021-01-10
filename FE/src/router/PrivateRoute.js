/* eslint-disable */

import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import Navigation from '../components/navigation/Navigation'

const PrivateRoute = ({ children, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.uid)

  return (
    <Route
      {...rest}
      render={({ location }) => (
        isAuthenticated ? (
          <>
            <Navigation />
            {children}
          </>
        ) : (
          <Redirect to={{
            pathname: '/',
            state: { from: location }
          }}/>
        )
      )}
    />
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.element,
}

export default PrivateRoute
