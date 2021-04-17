import React from 'react'
import PropTypes from 'prop-types'

const PreviewBox = ({ children }) => <div className='previewBox'>{children}</div>

PreviewBox.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
}

export default PreviewBox
