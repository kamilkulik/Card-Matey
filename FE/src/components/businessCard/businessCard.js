import React, { useState, Fragment } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

const BusinessCard = () => {
  const [formFields, setFormFields] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    website: '',
  })
  const { id } = useParams()
  const history = useHistory()
  const savedData = useSelector((state) => state.cards.find((card) => card.id === id))

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setFormFields({ ...formFields, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const goBack = () => {
    history.goBack()
  }

  return (
    <Fragment>
      <button onClick={goBack}>&larr; Back</button>
      <h1>Card {id}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='firstName'
          placeholder='First Name'
          value={formFields.firstName}
          onChange={handleChange}
        />
        <input
          type='text'
          name='lastName'
          placeholder='Last Name'
          value={formFields.firstName}
          onChange={handleChange}
        />
        <input
          type='text'
          name='mobile'
          placeholder='Mobile'
          value={formFields.firstName}
          onChange={handleChange}
        />
        <input
          type='text'
          name='email'
          placeholder='Email'
          value={formFields.firstName}
          onChange={handleChange}
        />
        <input
          type='text'
          name='website'
          placeholder='Website'
          value={formFields.firstName}
          onChange={handleChange}
        />
      </form>
    </Fragment>
  )
}

export default BusinessCard
