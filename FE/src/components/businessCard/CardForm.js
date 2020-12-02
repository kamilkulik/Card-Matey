import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { updateCard } from '../../actions/cardActions'
import { useDispatch } from 'react-redux'

const CardForm = ({ card, onSubmit, toggleEdit }) => {
  const initialState = {
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    website: '',
    ...card,
  }
  const [formFields, setFormFields] = useState(initialState)
  const dispatch = useDispatch()

  const { id } = useParams()

  const handleSubmit = (updates) => {
    onSubmit(updates, id)
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      const dataAttribute = e.target.attributes.data.value
      const node = document.querySelector(`#${dataAttribute}`)
      node.blur()
    }
  }

  const handleBlur = (event) => {
    const name = event.target.attributes.data.value
    const value = event.target.innerText
    const updates = { ...formFields, [name]: value }
    setFormFields(updates)
    dispatch(updateCard(id, updates))
    handleSubmit(updates)
    // toggleEdit()
  }

  const placeholders = ['First Name', 'Last Name', 'Mobile', 'Email', 'Website']

  return (
    <div className='cardForm'>
      {Object.entries(formFields).map((field, index) => {
        return (
          <div key={field[0]} className='cardForm-input'>
            <span
              contentEditable
              role='textbox'
              className='cardForm-input__input'
              type='text'
              id={field[0]}
              data={field[0]}
              placeholder={placeholders[index]}
              value={formFields[field[0]]}
              onKeyDown={handleKeyPress}
              onBlur={handleBlur}>
              {formFields[field[0]]}
            </span>
          </div>
        )
      })}
      {/*<input type='submit' value='Save Card' className='cardForm-submit' />*/}
    </div>
  )
}

export default CardForm
