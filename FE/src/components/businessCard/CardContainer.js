import React from 'react'
import sizeMe from 'react-sizeme'
import useDynamicFont from '../../hooks/useDynamicFont'
import canvasLogos from '../canvas/CanvasLogos'
import CanvasSquares from '../canvas/CanvasSquares'

const CardContainer = ({ size: { width }, children, logo: logoProp = 'squares' }) => {
  useDynamicFont(12, width)

  return (
    <div className='presentation'>
      <div className='presentation__canvas'>
        {logoProp === 'squares' && <CanvasSquares draw={canvasLogos[0].draw} />}
        {logoProp === 'triangles' && <CanvasSquares draw={canvasLogos[1].draw} />}
        {logoProp === 'circles' && <CanvasSquares draw={canvasLogos[2].draw} />}
        {/*<Canvas draw={canvasLogos.find((logo) => logo.name === logoProp).draw} />*/}
      </div>
      <div className='presentation__data'>
        <div className='presentation__data-text'>{children}</div>
      </div>
    </div>
  )
}

export default sizeMe()(CardContainer)
