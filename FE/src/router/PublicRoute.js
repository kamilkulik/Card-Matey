/* eslint-disable */

import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import useVerifyTimestamp from '../hooks/useVerifyTimestamp'

const PublicRoute = ({ children, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.uid)
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
