import React from 'react'
import themes from '../businessCard/CardPatterns'
import PreviewBox from '../previewBox/PreviewBox'

const ThemePreview = ({ savedTheme, handleSelect }) => {
  return (
    <PreviewBox>
      {themes().map((theme) => {
        return (
          <div
            className={
              savedTheme === theme.name ? 'previewBox__wrapper active' : 'previewBox__wrapper'
            }
            onClick={() => handleSelect('theme', theme.name)}
            key={theme.name}
            style={{ backgroundImage: theme.pattern }}
          />
        )
      })}
    </PreviewBox>
  )
}

export default ThemePreview
