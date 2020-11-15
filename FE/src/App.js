import React from 'react'
import useGetCards from './hooks/getCards'

function App() {
  const { status, data, error } = useGetCards('218L3QFZARcHnQy9Y9q5')
  return (
    <React.Fragment>
      {status === 'fetched' && (
        <div className='app-wrapper'>Hello! There are: {data.length} business cards stored</div>
      )}
    </React.Fragment>
  )
}

export default App
