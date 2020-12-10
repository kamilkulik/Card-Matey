import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CardContainer from '../businessCard/CardContainer'
import CardText from '../businessCard/CardText'

const CardGallery = () => {
  const cardData = useSelector((state) => state.cards)
  const cardLogo = (card) => {
    if ('cardSpec' in card) return card.cardSpec.logo
    else return 'squares'
  }

  return (
    <div className='gallery'>
      <ul className='gallery__layout'>
        {cardData.length > 0 &&
          cardData.map((card, index) => {
            return (
              <li key={card.id}>
                <Link to={`/${card.id}`} className='gallery__link'>
                  <CardContainer logo={cardLogo(card)}>
                    <CardText card={card} />
                  </CardContainer>
                </Link>
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default CardGallery
