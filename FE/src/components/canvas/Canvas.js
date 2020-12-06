import React from 'react'
import useCanvas from '../../hooks/useCanvas'

const Canvas = ({ draw }) => {
  const canvasRef = useCanvas(draw)

  return (
    <div className='cardView__canvas'>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}

export default Canvas
