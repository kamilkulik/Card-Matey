import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import CardGallery from '../components/cardGallery/CardGallery'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Route path={'/gallery'} component={CardGallery} />
    </BrowserRouter>
  )
}

export default AppRouter

// review exisiting card
// editing existing card
// create new card
// delete card
