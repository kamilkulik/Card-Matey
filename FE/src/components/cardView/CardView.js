import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { startDeleteCard, startUpdateCard, startAddCard } from '../../actions/cardActions'
import { useSelector, useDispatch } from 'react-redux'
import filterCardProps from '../../utilities/filterCardProps'
import CardContainer from '../businessCard/CardContainer'
import CardForm from '../businessCard/CardForm'
import logos from '../canvas/CanvasLogos'

const CardView = () => {
  const { id } = useParams()
  const card = useSelector((state) => state.cards.find((card) => card.id === id))
  const savedLogo = id && ((card.hasOwnProperty('cardSpec') && card.cardSpec.logo) || 'squares')
  const cleanDataObject = filterCardProps(card)

  const initialState = {
    firstName: 'First Name',
    lastName: 'Last Name',
    mobile: 'Mobile',
    email: 'Email',
    website: 'Website',
    ...cleanDataObject,
  }
  const [formFields, setFormFields] = useState(initialState)
  const [logo, setLogo] = useState(savedLogo)

  const [edit, setEdit] = useState(false)

  const history = useHistory()
  const dispatch = useDispatch()

  const goBack = () => {
    history.goBack()
  }

  const handleEdit = (bool) => () => {
    setEdit(bool)
  }

  const handleDelete = () => {
    if (window.confirm('Please confirm you want to delete this Card')) {
      dispatch(startDeleteCard(id))
      history.push('/')
    }
  }

  const handleOnSubmit = () => {
    const updates = { ...formFields, cardSpec: { logo } }
    // add validation so you don't add the same card twice
    if (!id) {
      dispatch(startAddCard(updates))
    } else {
      dispatch(startUpdateCard(updates, id))
      setEdit(false)
    }
  }

  const handleSelect = (e) => {
    const value = e.target.value
    setLogo(value)
  }

  return (
    <div className='cardView'>
      <div className='cardView__preview'>
        <button onClick={goBack}>&larr; Back</button>
        <div className='cardView__preview-container'>
          <CardContainer logo={logo}>
            <CardForm id={id} edit={edit} formFields={formFields} setFormFields={setFormFields} />
          </CardContainer>
        </div>
      </div>
      <div className='cardView__logo'>
        {edit && (
          <select value={logo} onChange={handleSelect}>
            {logos.map((logo) => {
              return (
                <option value={logo.name} key={logo.name}>
                  {logo.name}
                </option>
              )
            })}
          </select>
        )}
      </div>
      <div className='cardView__theme'>
        <button onClick={handleEdit(!edit)}>Edit</button>
        <br />
        <button onClick={handleDelete}>Delete Card</button>
        <br />
        {(edit || !id) && <button onClick={handleOnSubmit}>Save</button>}
      </div>
    </div>
  )
}

export default CardView
