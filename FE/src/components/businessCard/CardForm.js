import React, { useState, useEffect, useRef } from 'react'
import { updateCard } from '../../actions/cardActions'
import { useDispatch } from 'react-redux'

const editStyle = { border: '1px dashed gray' }
const defaultStyle = { border: '1px solid transparent' }

const CardForm = ({ id, toggleEdit, edit, formFields, setFormFields }) => {
  const [style, setStyle] = useState(defaultStyle)
  const dispatch = useDispatch()
  const form = useRef()

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

  const handleClick = (e) => {
    // if the user clicks outside the form WITHOUT bluring the input span, we need to blur that span to update local component state
    const spanInFocus = document.activeElement
    spanInFocus.blur()

    if (!form.current.contains(e.target) && e.target.type !== 'submit') {
      toggleEdit(false)()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClick)

    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [])

  // const placeholders = ['First Name', 'Last Name', 'Mobile', 'Email', 'Website']

  useEffect(() => {
    if (edit) setStyle(editStyle)
    else setStyle(defaultStyle)
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
              style={style}
              type='text'
              id={field[0]}
              data={field[0]}
              onKeyDown={handleKeyPress}
              onBlur={handleBlur}>
              {formFields[field[0]]}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default CardForm
