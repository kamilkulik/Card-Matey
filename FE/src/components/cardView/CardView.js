import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { startDeleteCard, startUpdateCard, startAddCard } from '../../actions/cardActions'
import { useSelector, useDispatch } from 'react-redux'
import filterCardProps from '../../utilities/filterCardProps'
import CardContainer from '../businessCard/CardContainer'
import CardForm from '../businessCard/CardForm'
import CarouselContainer from '../Carousel/CarouselContainer'
import cardPatterns from '../businessCard/CardPatterns'

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
  const [logo, setLogo] = useState(savedSpec.logo || 'squares')
  const [theme, setTheme] = useState(savedSpec.theme || 'none')
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
    const updates = { ...formFields, cardSpec: { logo, theme } }
    // add validation so you don't add the same card twice
    if (!id) {
      dispatch(startAddCard(updates))
    } else {
      dispatch(startUpdateCard(updates, id))
      setEdit(false)
    }
  }

  React.useEffect(() => {
    console.log(savedSpec)
    const pattern = cardPatterns.find((pattern) => pattern.name === theme).pattern
    const root = document.documentElement
    root.style.setProperty('--cardPattern', pattern)
  }, [theme])

  const handleSelect = (e) => {
    const value = e.target.value
    setTheme(value)
  }

  return (
    <div className='cardView'>
      <div className='cardView__preview'>
        <button className='button' onClick={goBack}>
          &larr; Back
        </button>
        <div className='cardView__preview-container'>
          <CardContainer spec={{ logo, theme }}>
            <CardForm id={id} edit={edit} formFields={formFields} setFormFields={setFormFields} />
          </CardContainer>
        </div>
      </div>
      <div className='cardView__logo'>
        {edit && <CarouselContainer logo={logo} setLogo={setLogo} />}
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
          <select value={theme} onChange={handleSelect}>
            {cardPatterns.map((pattern) => {
              return (
                <option value={pattern.name} key={pattern.name}>
                  {pattern.name}
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
