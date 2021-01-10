import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'
import LoginPage from '../components/login/LoginPage'
import CardGallery from '../components/cardGallery/CardGallery'
import CardView from '../components/cardView/CardView'
// import history from './history'
// import Navigation from '../components/navigation/Navigation'

const AppRouter = () => (
  <Router>
    <Switch>
      <PublicRoute exact path='/'><LoginPage /></PublicRoute>
      <PrivateRoute path='/dashboard'><CardGallery /></PrivateRoute>
      <PrivateRoute path='/add'><CardView key='new' /></PrivateRoute>
      <PrivateRoute path='/:id'><CardView key='edit' /></PrivateRoute>
    </Switch>
  </Router>
)

export default AppRouter
