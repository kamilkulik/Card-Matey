import React from 'react';
import PropTypes from 'prop-types';
import logos from '../canvas/CanvasLogos';
import Canvas from '../canvas/Canvas';
import PreviewBox from './PreviewBox';

const LogoPreview = ({ savedLogo, handleSelect }) => (
  <PreviewBox>
    {logos.map((logo) => (
      <div
        className={savedLogo === logo.name ? 'previewBox__wrapper active' : 'previewBox__wrapper'}
        onClick={() => handleSelect('logo', logo.name)}
        key={logo.name}
        role="button"
        aria-label={logo.name}
        tabIndex={0}
      >
        <Canvas key={logo.name} draw={logo.draw} />
      </div>
    ))}
  </PreviewBox>
);

LogoPreview.propTypes = {
  savedLogo: PropTypes.string.isRequired,
  handleSelect: PropTypes.func.isRequired,
};

export default LogoPreview;
