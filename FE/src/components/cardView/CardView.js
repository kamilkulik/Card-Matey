import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import CardContainer from '../businessCard/CardContainer'
import CardText from '../businessCard/CardText'
import { startDeleteCard } from '../../actions/cardActions'
import { useDispatch } from 'react-redux'
import EditBusinessCard from '../businessCard/EditBusinessCard'
import AddBusinessCard from '../businessCard/AddBusinessCard'

const CardView = () => {
  const [edit, setEdit] = useState(false)
  const [newCardEditor, setNewCardEditor] = useState(false)

  const history = useHistory()
  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!id) setNewCardEditor(true)
  }, [])

  const goBack = () => {
    history.goBack()
  }

  const handleEdit = () => {
    setEdit(!edit)
  }

  const handleDelete = () => {
    if (window.confirm('Please confirm you want to delete this Card')) {
      dispatch(startDeleteCard(id))
      history.push('/')
    }
  }

  return (
    <div className='cardView'>
      <div className='cardView__preview'>
        <button onClick={goBack}>&larr; Back</button>
        <div className='cardView__preview-container'>
          {newCardEditor ? (
            <AddBusinessCard toggleEdit={handleEdit} />
          ) : edit ? (
            <EditBusinessCard toggleEdit={handleEdit} />
          ) : (
            <CardContainer>
              <CardText />
            </CardContainer>
          )}
        </div>
      </div>
      <div className='cardView__theme'>
        {!newCardEditor && (
          <React.Fragment>
            <button onClick={handleEdit}>Edit</button>
            <br />
            <button onClick={handleDelete}>Delete Card</button>
          </React.Fragment>
        )}
      </div>
    </div>
  )
}

export default CardView
