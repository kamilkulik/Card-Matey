import React from 'react'
import CardForm from './CardForm'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const EditBusinessCard = () => {
  const { id } = useParams()
  const card = useSelector((state) => state.cards.find((card) => card.id === id))
  const cleanData = Object.entries(card).filter(
    (property) => !['id', 'timestamp'].includes(property[0])
  )
  const cleanDataObject = Object.fromEntries(cleanData)

  return <CardForm card={cleanDataObject} />
}

export default EditBusinessCard
