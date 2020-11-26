import React from 'react'

import sizeMe from 'react-sizeme'
import useDynamicFont from '../../hooks/useDynamicFont'

const CardContainer = ({ size: { width }, children }) => {
  useDynamicFont(12, width)

  return (
    <div className='presentation'>
      <div className='presentation__data'>
        <div className='presentation__data-text'>{children}</div>
      </div>
    </div>
  )
}

export default sizeMe()(CardContainer)
