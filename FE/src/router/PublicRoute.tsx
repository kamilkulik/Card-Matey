/* eslint-disable */

import React from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import PropTypes from 'prop-types'
import useVerifyTimestamp from '../hooks/useVerifyTimestamp'

interface PublicRouteProps extends RouteProps{
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children, ...rest }) => {
  const isAuthenticated = useTypedSelector((state) => state.auth.uid)
  const authTimestampValid = useVerifyTimestamp()

  return (
    <Route
      {...rest}
      render={() => (
        isAuthenticated && authTimestampValid
          ? (
            <Redirect to='/' />
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
