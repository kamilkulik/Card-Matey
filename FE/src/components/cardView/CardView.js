import React from 'react'
import CardPresentation from '../businessCard/CardPresentation'
import EditBusinessCard from '../businessCard/EditBusinessCard'

const CardView = () => {
  return (
    <div className='cardView'>
      <div className='cardView__preview'>
        <div className='cardView__preview-container'>
          <CardPresentation />
        </div>
      </div>
      <div className='cardView__form'>
        <EditBusinessCard />
      </div>
    </div>
  )
}

export default CardView
