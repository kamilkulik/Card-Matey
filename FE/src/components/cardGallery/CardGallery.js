import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const CardGallery = () => {
  const cardData = useSelector((state) => state.cards)

  return (
    <React.Fragment>
      <button>
        <Link to={'/add'}>Create a new Card</Link>
      </button>
      <ul>
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
    </React.Fragment>
  )
}

export default CardGallery
