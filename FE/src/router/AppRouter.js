import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navigation from '../components/navigation/Navigation'
import CardGallery from '../components/cardGallery/CardGallery'
import CardView from '../components/cardView/CardView'

const AppRouter = () => {
  const isLoading = useSelector((state) => state.loading).status

  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path='/' component={CardGallery} />
        <Route path='/add'>{isLoading === 'FETCHED' ? <CardView key='new' /> : <p>Assets laoding...</p>}</Route>
        <Route path='/:id'>{isLoading === 'FETCHED' ? <CardView key='edit' /> : <p>Assets laoding...</p>}</Route>
      </Switch>
    </Router>
  )
}

export default AppRouter

// review exisiting card
// editing existing card
// create new card
// delete card
