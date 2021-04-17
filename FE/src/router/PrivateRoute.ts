/* eslint-disable */

import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import Navigation from '../components/navigation/Navigation'
import Spinner from '../components/spinner/spinner'
import useVerifyTimestamp from '../hooks/useVerifyTimestamp'

const PrivateRoute = ({ children, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth)
  const assetsLoaded = useSelector((state) => state.loading.status === 'FETCHED')
  const fetchError = useSelector((state) => state.loading)
  const authTimestampValid = useVerifyTimestamp()

  return (
    <Route
      {...rest}
      render={({ location }) => (
        isAuthenticated.uid && authTimestampValid
        ? (
            <>
              <Navigation />
              {assetsLoaded
                ? children
                : fetchError.status === 'FETCH_ERR'
                  ? <p>{fetchError.error}</p>
                  : <Spinner />
              }
            </>
          ) 
        : (
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
