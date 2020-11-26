import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import filterCardData from '../../utilities/filterCardProps'
import { useParams } from 'react-router-dom'

const CardText = ({ card }) => {
  const initialState = {
    firstName: 'John',
    lastName: 'Appleseed',
    mobile: '+1 123 456 789',
    email: 'john.appleseed@example.com',
    website: 'www.example.com',
  }
  const [formFields, setFormFields] = useState(initialState)
  const { id } = useParams()
  const reduxData = useSelector((state) => state.cards.find((card) => card.id === id))

  let cardData
  if (!id) cardData = card
  else cardData = reduxData

  const cleadDataObject = filterCardData(cardData)

  useEffect(() => {
    setFormFields({ ...initialState, ...cleadDataObject })
  }, [reduxData])

  return (
    <p>
      {formFields.firstName} {formFields.lastName}
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
