import React from 'react'
import logos from '../canvas/CanvasLogos'
import Canvas from '../canvas/Canvas'
import PreviewBox from '../previewBox/PreviewBox'

const LogoPreview = ({ savedLogo, handleSelect }) => {
  return (
    <PreviewBox>
      {logos.map((logo) => {
        return (
          <div
            className={
              savedLogo === logo.name ? 'previewBox__wrapper active' : 'previewBox__wrapper'
            }
            onClick={() => handleSelect('logo', logo.name)}
            key={logo.name}>
            <Canvas key={logo.name} draw={logo.draw} />
          </div>
        )
      })}
    </PreviewBox>
  )
}

export default LogoPreview
