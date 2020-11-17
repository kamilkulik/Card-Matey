import React, { Fragment } from 'react'
import AppRouter from './router/AppRouter'
import { useSelector } from 'react-redux'

function App() {
  const cards = useSelector((state) => state.cards)

  return (
    <React.Fragment>
      {cards.length > 0 && (
        <div className='app-wrapper'>Hello! There are: {cards.length} business cards stored</div>
      )}
      <AppRouter />
    </React.Fragment>
  )
}

export default App
