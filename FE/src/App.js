import React, { useState, useEffect } from 'react'
import useGetCards from './hooks/getCards'
import AppRouter from './router/AppRouter'
import AppContext from './AppContext'

function App() {
  const { status, data } = useGetCards()
  const [cardData, setCardData] = useState('')
  useEffect(() => {
    if (status === 'fetched') setCardData(data)
  }, [status, data])
  return (
    <AppContext.Provider value={{ cardData }}>
      {status === 'fetched' && (
        <div className='app-wrapper'>Hello! There are: {data.length} business cards stored</div>
      )}
      <AppRouter />
    </AppContext.Provider>
  )
}

export default App
