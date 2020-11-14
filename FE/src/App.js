import React from 'react'
import useGetCards from './hooks/getCards'

function App() {
  const { status, data, error } = useGetCards()
  return (
    <React.Fragment>
      {status === 'fetched' && (
        <div className='app-wrapper'>Hello! There are: {data.length} business cards stored</div>
      )}
    </React.Fragment>
  )
}

export default App
