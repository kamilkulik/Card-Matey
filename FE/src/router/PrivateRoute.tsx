/* eslint-disable */

import React from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector'
import { Route, Redirect, RouteProps } from 'react-router-dom';
import Navigation from '../components/navigation/Navigation';
import Spinner from '../components/spinner/spinner';
import useVerifyTimestamp from '../hooks/useVerifyTimestamp';
import { FetchActionType } from '../state/actionTypes'

interface PrivateRouteProps extends RouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, ...rest }) => {
  const isAuthenticated = useTypedSelector((state) => state.auth);
  const assetsLoaded = useTypedSelector((state) => state.loading.status === FetchActionType.FETCHED);
  const fetchError = useTypedSelector((state) => state.loading);
  const authTimestampValid = useVerifyTimestamp();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated.uid && authTimestampValid ? (
          <>
            <Navigation />
            {assetsLoaded ? children : fetchError.status === FetchActionType.FETCH_ERR ? <p>{fetchError.error}</p> : <Spinner />}
          </>
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
