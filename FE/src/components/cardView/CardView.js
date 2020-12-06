import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { startDeleteCard, startUpdateCard, startAddCard } from '../../actions/cardActions'
import { useSelector, useDispatch } from 'react-redux'
import filterCardProps from '../../utilities/filterCardProps'
import CardContainer from '../businessCard/CardContainer'
import Canvas from '../canvas/Canvas'
import CardForm from '../businessCard/CardForm'

const CardView = () => {
  const { id } = useParams()
  const card = useSelector((state) => state.cards.find((card) => card.id === id))
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
    if (!id) dispatch(startAddCard(formFields))
    else dispatch(startUpdateCard(formFields, id))
  }

  const draw = (ctx) => {
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }

  return (
    <div className='cardView'>
      <div className='cardView__preview'>
        <button onClick={goBack}>&larr; Back</button>
        <div className='cardView__preview-container'>
          <CardContainer>
            <CardForm
              id={id}
              toggleEdit={handleEdit}
              edit={edit}
              formFields={formFields}
              setFormFields={setFormFields}
            />
          </CardContainer>
        </div>
      </div>
      <Canvas draw={draw} />
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
