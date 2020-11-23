import React, { useState, Fragment } from 'react'
import { useParams } from 'react-router-dom'

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
  const [editable, setEditable] = useState(true)

  const { id } = useParams()

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setFormFields({ ...formFields, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    onSubmit(formFields, id)
  }

  const placeholders = ['First Name', 'Last Name', 'Mobile', 'Email', 'Website']

  return (
    <Fragment>
      <form onSubmit={handleSubmit} className='cardForm'>
        {Object.entries(formFields).map((field, index) => {
          return (
            <div key={field[0]} className='cardForm-input'>
              <label htmlFor={field[0]} className='cardForm-input__label'>
                {placeholders[index]}
              </label>
              <input
                className='cardForm-input__input'
                disabled={editable ? '' : 'disabled'}
                type='text'
                name={field[0]}
                placeholder={placeholders[index]}
                value={formFields[field[0]]}
                onChange={handleChange}
              />
            </div>
          )
        })}
        <input type='submit' value='Save Card' />
      </form>
    </Fragment>
  )
}

export default CardForm
