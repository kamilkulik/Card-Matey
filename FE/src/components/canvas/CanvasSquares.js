import React, { useRef, useEffect } from 'react'

const CanvasSquares = ({ draw }) => {
  const canvasSquares = useRef(null)

  useEffect(() => {
    const canvas = canvasSquares.current
    const context = canvas.getContext('2d')
    draw(context)
  }, [draw])

  return <canvas ref={canvasSquares} height={100} width={100} className={'canvas'}></canvas>
}

export default CanvasSquares
