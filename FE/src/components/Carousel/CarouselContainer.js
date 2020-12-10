import React, { useState } from 'react'
import Carousel from './Carousel'
import logos from '../canvas/CanvasLogos'
import Canvas from '../canvas/CanvasSquares'

const CarouselContainer = () => {
  const [carouselPage, setCarouselPage] = useState(0)

  const transitionDur = 1000

  return (
    <div className='wrapper'>
      <Carousel transitionDuration={transitionDur} slides={logos} pageNo={setCarouselPage}>
        <div className='wrapper__content'>
          <Canvas draw={logos[carouselPage].draw} />
        </div>
      </Carousel>
    </div>
  )
}

export default CarouselContainer
