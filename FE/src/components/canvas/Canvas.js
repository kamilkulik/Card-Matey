import React from 'react'
import useCanvas from '../../hooks/useCanvas'

const Canvas = ({ draw }) => {
  const canvasRef = useCanvas(draw)

  return <canvas ref={canvasRef} height={100} width={100} className={'canvas'}></canvas>
}

export default Canvas
