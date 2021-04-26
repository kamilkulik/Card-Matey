/* eslint-disable */
import { Card } from '../../shared'

import React from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { Link } from 'react-router-dom'
import CardContainer from '../businessCard/CardContainer'
import CardText from '../businessCard/CardText'

const CardGallery = () => {
  const cardData = useTypedSelector((state) => state.cards)

  const cardSpec = (card: Card) => {
    if ('cardSpec' in card) return card.cardSpec
    return {
      logo: 'squares',
      theme: 'none',
      colour: 'black',
    }
  }

  return (
    <div className='gallery'>
      <ul className='gallery__layout'>
        { (cardData.length > 0
            && cardData.map((card) => (
              <li key={card.id}>
                <Link to={`/edit/${card.id}`} className='gallery__link'>
                  <CardContainer spec={cardSpec(card)}>
                    <CardText card={card} />
                  </CardContainer>
                </Link>
              </li>
            )))}
      </ul>
    </div>
  )
}

export default CardGallery
