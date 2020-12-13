import React from 'react'
import sizeMe from 'react-sizeme'
import useDynamicFont from '../../hooks/useDynamicFont'
import canvasLogos from '../canvas/CanvasLogos'
import cardPatterns from '../businessCard/CardPatterns'
import CanvasSquares from '../canvas/CanvasSquares'

const CardContainer = ({
  size: { width },
  children,
  spec: { logo: logoProp = 'squares', theme: themeProp = 'none', colour: colourProp = 'black' },
}) => {
  useDynamicFont(12, width)

  const theme = cardPatterns(colourProp, width).find((pattern) => pattern.name === themeProp)
    .pattern
  const drawFunction = canvasLogos.find((logo) => logo.name === logoProp).draw

  return (
    <div className='presentation' style={{ backgroundImage: theme }}>
      <div className='presentation__canvas'>
        {<CanvasSquares draw={drawFunction} key={logoProp} />}
      </div>
      <div className='presentation__data'>
        <div className='presentation__data-text'>{children}</div>
      </div>
    </div>
  )
}

export default sizeMe()(CardContainer)
