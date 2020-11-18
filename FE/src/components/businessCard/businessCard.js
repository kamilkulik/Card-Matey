import React, { useState, Fragment } from 'react'
import { useParams } from 'react-router-dom'

const BusinessCard = () => {
  const [formFields, setFormFields] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    website: '',
  })

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setFormFields({ ...formFields, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const { id } = useParams()

  return (
    <Fragment>
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
