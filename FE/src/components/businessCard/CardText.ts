import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import filterCardData from '../../utilities/filterCardProps'

const CardText = ({ card }) => {
  const initialState = {
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    website: '',
  }
  const [formFields, setFormFields] = useState(initialState)
  const { id } = useParams()
  const reduxData = useSelector((state) => state.cards.find((savedCard) => savedCard.id === id))

  let cardData
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

function isCorrectCard(propValue, key, componentName) {
  if (!['string', 'object'].includes(typeof propValue[key])) {
    return new Error(`invalid prop object key ${propValue[key]} passed to ${componentName}`)
  } return 'no errors'
}

CardText.propTypes = {
  card: PropTypes.objectOf(isCorrectCard).isRequired,
}

export default CardText
