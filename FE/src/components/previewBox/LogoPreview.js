import React from 'react';
import logos from '../canvas/CanvasLogos';
import Canvas from '../canvas/Canvas';
import PreviewBox from './PreviewBox';

const LogoPreview = ({ savedLogo, handleSelect }) => (
  <PreviewBox>
    {logos.map((logo) => (
      <div
        className={
              savedLogo === logo.name ? 'previewBox__wrapper active' : 'previewBox__wrapper'
            }
        onClick={() => handleSelect('logo', logo.name)}
        key={logo.name}
      >
        <Canvas key={logo.name} draw={logo.draw} />
      </div>
    ))}
  </PreviewBox>
);

export default LogoPreview;
