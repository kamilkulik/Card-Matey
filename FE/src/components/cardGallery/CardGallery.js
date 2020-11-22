import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const CardGallery = () => {
  const cardData = useSelector((state) => state.cards)

  return (
    <div className='gallery'>
      <button className='button'>
        <Link to={'/add'}>Create a new Card</Link>
      </button>
      <ul className='gallery__layout'>
        {cardData.length > 0 &&
          cardData.map((card, index) => {
            return (
              <li key={card.id}>
                <Link to={`/${card.id}`}>
                  Card #{index + 1} has id: {card.id}
                </Link>
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default CardGallery
