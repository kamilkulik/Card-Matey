import React from 'react'
import useGetCards from './hooks/getCards'

function App() {
  const res = useGetCards()
  if (res.status === 'fetched') {
    console.log(res)
  }
  return <div className='app-wrapper'>Hello!</div>
}

export default App
