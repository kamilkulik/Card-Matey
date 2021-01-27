import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

const Canvas = ({ draw }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    // get DPI
    const dpi = window.devicePixelRatio
    // get canvas
    const canvas = canvasRef.current
    // get context
    const context = canvas.getContext('2d')
    const fixDpi = () => {
      // get CSS height
      // the + prefix casts it to an integer
      // the slice method gets rid of "px"
      const styleHeight = +getComputedStyle(canvas).getPropertyValue('height').slice(0, -2)
      // get CSS width
      const styleWidth = +getComputedStyle(canvas).getPropertyValue('width').slice(0, -2)
      // scale the canvas
      canvas.setAttribute('height', styleHeight * dpi)
      canvas.setAttribute('width', styleWidth * dpi)
    }

    fixDpi()

    const {
      canvas: { clientWidth: width },
    } = context
    const magicNumber = width / (100 / dpi)
    draw(context, magicNumber)
  }, [draw])

  return <canvas ref={canvasRef} height={100} width={100} className='canvas' />
}

Canvas.propTypes = {
  draw: PropTypes.func.isRequired,
}

export default Canvas
