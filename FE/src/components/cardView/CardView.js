import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { startDeleteCard, startUpdateCard, startAddCard } from '../../actions/cardActions'
import { useSelector, useDispatch } from 'react-redux'
import filterCardProps from '../../utilities/filterCardProps'
import CardContainer from '../businessCard/CardContainer'
import CardForm from '../businessCard/CardForm'
import CarouselContainer from '../Carousel/CarouselContainer'
import cardPatterns, { colours } from '../businessCard/CardPatterns'

const CardView = () => {
  const { id } = useParams()
  const card = useSelector((state) => state.cards.find((card) => card.id === id))
  const cardSpec = id && card.hasOwnProperty('cardSpec')
  const savedSpec = (cardSpec && card.cardSpec) || { logo: 'squares', theme: 'none' }
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
  const [cardSpecState, setCardSpecState] = useState({
    logo: savedSpec.logo || 'squares',
    theme: savedSpec.theme || 'none',
    colour: savedSpec.colour || 'Black',
  })
  const { logo, theme, colour } = cardSpecState

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
    const updates = { ...formFields, cardSpec: { logo, theme, colour } }
    // add validation so you don't add the same card twice
    if (!id) {
      dispatch(startAddCard(updates))
    } else {
      dispatch(startUpdateCard(updates, id))
      setEdit(false)
    }
  }

  useEffect(() => {
    const pattern = cardPatterns().find((pattern) => pattern.name === theme).pattern
    const root = document.documentElement
    root.style.setProperty('--cardPattern', pattern)
  }, [theme])

  const handleSelect = (e) => {
    const value = e.target.value
    const name = e.target.name
    setCardSpecState({ ...cardSpecState, [name]: value })
  }

  const handleLogo = (logo) => {
    setCardSpecState({ ...cardSpecState, logo })
  }

  return (
    <div className='cardView'>
      <div className='cardView__preview'>
        <button className='button' onClick={goBack}>
          &larr; Back
        </button>
        <div className='cardView__preview-container'>
          <CardContainer spec={{ logo, theme, colour }}>
            <CardForm id={id} edit={edit} formFields={formFields} setFormFields={setFormFields} />
          </CardContainer>
        </div>
      </div>
      <div className='cardView__logo'>
        {edit && <CarouselContainer logo={cardSpecState.logo} setLogo={handleLogo} />}
      </div>
      <div className='cardView__theme'>
        <button className='button' onClick={handleEdit(!edit)}>
          Edit
        </button>
        <br />
        <button className='button' onClick={handleDelete}>
          Delete Card
        </button>
        <br />
        {(edit || !id) && (
          <button className='button' onClick={handleOnSubmit}>
            Save
          </button>
        )}
        {edit && (
          <select value={theme} onChange={handleSelect} name='theme'>
            {cardPatterns().map((pattern) => {
              return (
                <option value={pattern.name} key={pattern.name}>
                  {pattern.name}
                </option>
              )
            })}
          </select>
        )}
        {edit && (
          <select value={colour} onChange={handleSelect} name='colour'>
            {colours.map((colour) => {
              return (
                <option value={colour.name} key={colour.name}>
                  {colour.name}
                </option>
              )
            })}
          </select>
        )}
      </div>
    </div>
  )
}

export default CardView
