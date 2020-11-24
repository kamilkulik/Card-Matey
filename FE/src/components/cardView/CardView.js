import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import CardPresentation from '../businessCard/CardPresentation'
import EditBusinessCard from '../businessCard/EditBusinessCard'

const CardView = () => {
  const [edit, setEdit] = useState(false)

  const history = useHistory()
  const goBack = () => {
    history.goBack()
  }

  const handleEdit = () => {
    setEdit(!edit)
  }

  return (
    <div className='cardView'>
      <div className='cardView__preview'>
        <button onClick={goBack}>&larr; Back</button>
        <div className='cardView__preview-container'>
          <CardPresentation />
        </div>
      </div>
      <div className='cardView__form'>
        <button onClick={handleEdit}>Edit</button>
        {edit && <EditBusinessCard />}
      </div>
    </div>
  )
}

export default CardView
