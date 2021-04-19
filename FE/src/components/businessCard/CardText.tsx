import React, { useState, useEffect } from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useParams } from 'react-router-dom'
import filterCardData from '../../utilities/filterCardProps'
import { Card } from '../../shared'

interface CardTextProps {
  card: Card
}

const CardText: React.FC<CardTextProps> = ({ card }) => {
  const initialState = {
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    website: '',
  }
  const [formFields, setFormFields] = useState(initialState)
  const { id } = useParams<{ id: string }>()
  const reduxData = useTypedSelector((state) => state.cards.find((savedCard) => savedCard.id === id)) as Card

  let cardData: Card
  if (!id) cardData = card
  else cardData = reduxData

  const cleadDataObject = filterCardData(cardData)

  useEffect(() => {
    setFormFields({ ...initialState, ...cleadDataObject })
  }, [reduxData])

  return (
    <p>
      {formFields.firstName}
      {' '}
      {formFields.lastName}
      <br />
      {formFields.mobile}
      <br />
      {formFields.email}
      <br />
      {formFields.website}
    </p>
  )
}

export default CardText
