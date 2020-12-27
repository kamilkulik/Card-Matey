import React from 'react'
import PropTypes from 'prop-types'
import themes from '../businessCard/CardPatterns'
import PreviewBox from './PreviewBox'

const ThemePreview = ({ savedTheme, handleSelect }) => (
  <PreviewBox>
    {themes().map((theme) => (
      <div
        className={
        savedTheme === theme.name ? 'previewBox__wrapper active' : 'previewBox__wrapper'
      }
        onClick={() => handleSelect('theme', theme.name)}
        key={theme.name}
        style={{ backgroundImage: theme.pattern }}
        role='button'
        aria-label={theme.name}
        tabIndex='0'
      />
    ))}
  </PreviewBox>
)

ThemePreview.propTypes = {
  savedTheme: PropTypes.string.isRequired,
  handleSelect: PropTypes.func.isRequired,
}

export default ThemePreview
