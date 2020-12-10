import React, { useRef, useEffect } from 'react'

const CanvasSquares = ({ draw }) => {
  const canvasSquares = useRef(null)

  useEffect(() => {
    const canvas = canvasSquares.current
    const context = canvas.getContext('2d')
    // const { width, height } = canvas.getBoundingClientRect()

    // if (canvas.width !== width || canvas.height !== height) {
    //   canvas.width = width
    //   canvas.height = height
    // }
    draw(context)
  }, [draw])

  return <canvas ref={canvasSquares} height={100} width={100} className={'canvas'}></canvas>
}

export default CanvasSquares
