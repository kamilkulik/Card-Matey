import React, { useState, Fragment } from 'react'
import { useParams, useHistory } from 'react-router-dom'

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

  const { id } = useParams()
  const history = useHistory()

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setFormFields({ ...formFields, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    onSubmit(formFields, id)
  }

  const goBack = () => {
    history.goBack()
  }

  const placeholders = ['First Name', 'Last Name', 'Mobile', 'Email', 'Website']

  return (
    <Fragment>
      <button onClick={goBack}>&larr; Back</button>
      <h1>Card {id}</h1>
      <form onSubmit={handleSubmit}>
        {Object.entries(formFields).map((field, index) => {
          return (
            <label key={field[0]}>
              {placeholders[index]}
              <input
                type='text'
                name={field[0]}
                placeholder={placeholders[index]}
                value={formFields[field[0]]}
                onChange={handleChange}
              />
            </label>
          )
        })}
        <input type='submit' value='Save Card' />
      </form>
    </Fragment>
  )
}

export default CardForm
