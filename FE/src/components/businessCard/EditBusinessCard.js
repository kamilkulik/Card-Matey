import React from 'react'
import CardContainer from './CardContainer'
import CardForm from './CardForm'
import filterCardProps from '../../utilities/filterCardProps'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { startUpdateCard } from '../../actions/cardActions'

const EditBusinessCard = () => {
  const { id } = useParams()

  const dispatch = useDispatch()

  const card = useSelector((state) => state.cards.find((card) => card.id === id))
  const cleanDataObject = filterCardProps(card)

  const onSubmit = (updates, id) => {
    dispatch(startUpdateCard(updates, id))
    // history.push('/')
  }

  return (
    <CardContainer>
      <CardForm card={cleanDataObject} onSubmit={onSubmit} />
    </CardContainer>
  )
}

export default EditBusinessCard
