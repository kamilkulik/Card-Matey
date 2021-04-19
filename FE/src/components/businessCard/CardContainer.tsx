import React from 'react'
import sizeMe from 'react-sizeme'
import ThemeContext from '../../ThemeContext'
import useDynamicFont from '../../hooks/useDynamicFont'
import canvasLogos from '../canvas/CanvasLogos'
import Canvas from '../canvas/Canvas'
import { CardSpec, Theme } from '../../shared/interfaces'

interface CardContainerProps {
  size: {
    width: number;
  };
  children: React.ReactNode;
  spec: CardSpec
}

const CardContainer: React.FC<CardContainerProps> = ({
  size: { width },
  children,
  spec: { logo: logoProp = 'squares', theme: themeProp = 'none', colour: colourProp = 'black' },
}) => {
  useDynamicFont(12, width)
  const cachedThemes: Theme[] = React.useContext(ThemeContext)
  const colourLessTheme = cachedThemes.find(((pattern) => pattern.name === themeProp))!.pattern
  const theme = colourLessTheme.replace('black', colourProp)

  const style = { backgroundImage: theme }

  const drawFunction = canvasLogos.find((logo) => logo.name === logoProp)!.draw

  return (
    <div className='presentation' style={style}>
      <div className='presentation__canvas'>
        <Canvas draw={drawFunction} key={logoProp} />
      </div>
      <div className='presentation__data'>
        <div className='presentation__data-text'>{children}</div>
      </div>
    </div>
  )
}

export default sizeMe()(CardContainer)

/*
url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='LightSlateGrey' fill-opacity='0.5' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")

url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill-opacity='0.5' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E fill='LightSlateGrey'")
*/
