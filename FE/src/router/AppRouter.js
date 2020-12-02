import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CardGallery from '../components/cardGallery/CardGallery'
import CardView from '../components/cardView/CardView'

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={'/'} component={CardGallery} />
        <Route path={'/add'} component={CardView} />
        <Route path={'/:id'} children={<CardView />} />
      </Switch>
    </Router>
  )
}

export default AppRouter

// review exisiting card
// editing existing card
// create new card
// delete card
