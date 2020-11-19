import React from 'react'
import CardForm from './CardForm'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { startDeleteCard, startUpdateCard } from '../../actions/cardActions'

const EditBusinessCard = () => {
  const { id } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()

  const card = useSelector((state) => state.cards.find((card) => card.id === id))
  const cleanData = Object.entries(card).filter(
    (property) => !['id', 'timestamp'].includes(property[0])
  )
  const cleanDataObject = Object.fromEntries(cleanData)

  const handleDelete = () => {
    if (window.confirm('Please confirm you want to delete this Card')) {
      dispatch(startDeleteCard(id))
      history.push('/')
    }
  }

  const onSubmit = (updates, id) => {
    dispatch(startUpdateCard(updates, id))
    history.push('/')
  }

  return (
    <React.Fragment>
      <CardForm card={cleanDataObject} onSubmit={onSubmit} />
      <button onClick={handleDelete}>Delete Card</button>
    </React.Fragment>
  )
}

export default EditBusinessCard