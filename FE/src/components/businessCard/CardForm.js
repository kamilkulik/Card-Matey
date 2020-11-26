import React, { useState, Fragment, createRef } from 'react'
import { useParams } from 'react-router-dom'
import { updateCard } from '../../actions/cardActions'
import { useDispatch } from 'react-redux'

const CardForm = ({ card, onSubmit }) => {
  const initialState = {
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    website: '',
    ...card,
  }
  const [formFields, setFormFields] = useState(initialState)
  // const [editable, setEditable] = useState(true)
  const dispatch = useDispatch()
  const cardInput = createRef()

  const { id } = useParams()

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    const updates = { ...formFields, [name]: value }
    setFormFields(updates)
    dispatch(updateCard(id, updates))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    onSubmit(formFields, id)
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      cardInput.current.blur()
    }
  }

  const placeholders = ['First Name', 'Last Name', 'Mobile', 'Email', 'Website']

  return (
    <Fragment>
      <form onSubmit={handleSubmit} className='cardForm'>
        {Object.entries(formFields).map((field, index) => {
          return (
            <div key={field[0]} className='cardForm-input'>
              {/*<label htmlFor={field[0]} className='cardForm-input__label'>
                {placeholders[index]}
          </label>*/}
              <input
                className='cardForm-input__input'
                // disabled={editable ? '' : 'disabled'}
                type='text'
                name={field[0]}
                placeholder={placeholders[index]}
                ref={cardInput}
                value={formFields[field[0]]}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                onBlur={handleSubmit}
              />
            </div>
          )
        })}
        {/*<input type='submit' value='Save Card' className='cardForm-submit' />*/}
      </form>
    </Fragment>
  )
}

export default CardForm
