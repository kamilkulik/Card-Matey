import React from 'react'
import { useSelector } from 'react-redux'

const CardGallery = () => {
  const cardData = useSelector((state) => state.cards)
  return (
    <ul>
      {cardData.length > 0 &&
        cardData.map((card, index) => {
          return (
            <li key={card.id}>
              Card #{index + 1} has id: {card.id}
            </li>
          )
        })}
    </ul>
  )
}

export default CardGallery
