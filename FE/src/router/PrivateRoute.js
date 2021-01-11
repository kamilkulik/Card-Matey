/* eslint-disable */

import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import Navigation from '../components/navigation/Navigation'
import Spinner from '../components/spinner/spinner'

const PrivateRoute = ({ children, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.uid)
  const assetsLoaded = useSelector((state) => state.loading.status === 'FETCHED')

  return (
    <Route
      {...rest}
      render={({ location }) => (
        isAuthenticated ? (
          <>
            <Navigation />
            {assetsLoaded
              ? children
              : <Spinner />
            }
          </>
        ) : (
          <Redirect to={{
            pathname: '/login',
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
