import React from 'react'
import { useDispatch } from 'react-redux'
import CardForm from './CardForm'
import { startAddCard } from '../../actions/cardActions'

const AddBusinessCard = ({ history }) => {
  const dispatch = useDispatch()

  const onSubmit = (formFields) => {
    dispatch(startAddCard(formFields))
    window.alert('Card created! You will now be redirected to Card Gallery')
    history.push('/')
  }

  return <CardForm onSubmit={onSubmit} />
}

export default AddBusinessCard
