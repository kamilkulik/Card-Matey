import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CardGallery from '../components/cardGallery/CardGallery'
import BusinessCard from '../components/businessCard/BusinessCard'

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={'/'} component={CardGallery} />
        <Route path={'/:id'} children={<BusinessCard />} />
      </Switch>
    </Router>
  )
}

export default AppRouter

// review exisiting card
// editing existing card
// create new card
// delete card
