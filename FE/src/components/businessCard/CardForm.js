import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { updateCard } from '../../actions/cardActions'
import { useDispatch } from 'react-redux'

const CardForm = ({ card, onSubmit, toggleEdit, edit }) => {
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
  const form = useRef()

  const { id } = useParams()

  const handleClick = (e) => {
    if (!form.current.contains(e.target)) {
      onSubmit(formFields, id)
      if (!!id) toggleEdit(false)()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClick)

    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [])

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
    id && dispatch(updateCard(id, updates))
  }

  const placeholders = ['First Name', 'Last Name', 'Mobile', 'Email', 'Website']

  let style = useRef()
  useEffect(() => {
    if (edit) style.current = { border: '1px dashed gray' }
    else style.current = { border: '1px solid transparent' }
  }, [edit])

  return (
    <div className='cardForm' ref={form}>
      {Object.entries(formFields).map((field, index) => {
        return (
          <div key={field[0]} className='cardForm-input'>
            <span
              contentEditable={edit}
              suppressContentEditableWarning='true'
              role='textbox'
              className='cardForm-input__input'
              style={style.current}
              type='text'
              id={field[0]}
              data={field[0]}
              onKeyDown={handleKeyPress}
              onBlur={handleBlur}>
              {formFields[field[0]] || placeholders[index]}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default CardForm
