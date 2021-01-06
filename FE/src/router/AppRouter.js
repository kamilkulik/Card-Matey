/* eslint-disable no-nested-ternary */

import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Login from '../components/login/Login'
import Navigation from '../components/navigation/Navigation'
import CardGallery from '../components/cardGallery/CardGallery'
import CardView from '../components/cardView/CardView'

const AppRouter = () => {
  const { status, error } = useSelector((state) => state.loading)

  return (
    <Router>
      <Route exact path='/' component={Login} />
      <Navigation />
      {status === 'FETCHED'
        ? (
          <Switch>
            <Route path='/dashboard' component={CardGallery} />
            <Route path='/add'><CardView key='new' /></Route>
            <Route path='/:id'><CardView key='edit' /></Route>
          </Switch>
        )
        : status === 'FETCH_ERR'
          ? <p>{error}</p>
          : <p>Assets are loading, please wait...</p>}
    </Router>
  )
}

export default AppRouter
