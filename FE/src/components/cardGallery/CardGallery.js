import React, { useContext } from 'react'
import AppContext from '../../AppContext'

const CardGallery = () => {
  const { cardData } = useContext(AppContext)
  return (
    <ul>
      {cardData.map((card, index) => {
        return <li key={card.id}>Card #{index + 1}</li>
      })}
    </ul>
  )
}

export default CardGallery
