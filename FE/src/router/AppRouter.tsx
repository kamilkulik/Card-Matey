import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import LoginPage from '../components/login/LoginPage';
import CardGallery from '../components/cardGallery/CardGallery';
import CardView from '../components/cardView/CardView';
import NotFoundPage from '../components/notFoundPage/NotFoundPage';

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <PublicRoute path="/login">
        <LoginPage />
      </PublicRoute>
      <PrivateRoute exact path="/">
        <CardGallery />
      </PrivateRoute>
      <PrivateRoute path="/add">
        <CardView key="new" />
      </PrivateRoute>
      <PrivateRoute path="/edit/:id">
        <CardView key="edit" />
      </PrivateRoute>
      <Route path="*">
        <NotFoundPage />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
