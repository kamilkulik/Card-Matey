import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import CardContainer from './CardContainer'
import CardForm from './CardForm'
import { startAddCard } from '../../actions/cardActions'

const AddBusinessCard = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const onSubmit = (formFields) => {
    dispatch(startAddCard(formFields))
    window.alert('Card created! You will now be redirected to Card Gallery')
    history.push('/')
  }

  return (
    <CardContainer>
      <CardForm onSubmit={onSubmit} />
    </CardContainer>
  )
}

export default AddBusinessCard
