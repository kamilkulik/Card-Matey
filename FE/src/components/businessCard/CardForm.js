import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { updateCard } from '../../actions/cardActions'

const editStyle = { border: '1px dashed gray' }
const defaultStyle = { border: '1px solid transparent' }

const CardForm = ({
  id = null, edit, formFields, setFormFields,
}) => {
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
    if (id) { dispatch(updateCard(id, updates)) }
  }

  useEffect(() => {
    if (edit) setStyle(editStyle)
    else setStyle(defaultStyle)
  }, [edit])

  return (
    <div className='cardForm' ref={form}>
      {Object.entries(formFields).map((field) => (
        <div key={field[0]} className='cardForm-input'>
          <span
            contentEditable={edit}
            suppressContentEditableWarning='true'
            role='textbox'
            tabIndex='0'
            className='cardForm-input__input'
            style={style}
            type='text'
            id={field[0]}
            data={field[0]}
            onKeyDown={handleKeyPress}
            onBlur={handleBlur}
          >
            {formFields[field[0]]}
          </span>
        </div>
      ))}
    </div>
  )
}

CardForm.propTypes = {
  id: PropTypes.string,
  edit: PropTypes.bool.isRequired,
  formFields: PropTypes.objectOf(PropTypes.object()).isRequired,
  setFormFields: PropTypes.func.isRequired,
}

CardForm.defaultProps = {
  id: null,
}

export default CardForm
