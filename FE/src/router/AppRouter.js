import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navigation from '../components/navigation/Navigation'
import CardGallery from '../components/cardGallery/CardGallery'
import CardView from '../components/cardView/CardView'

const AppRouter = () => (
  <Router>
    <Navigation />
    <Switch>
      <Route exact path='/' component={CardGallery} />
      <Route path='/add'><CardView key='new' /></Route>
      <Route path='/:id'><CardView key='edit' /></Route>
    </Switch>
  </Router>
)

export default AppRouter

// review exisiting card
// editing existing card
// create new card
// delete card
