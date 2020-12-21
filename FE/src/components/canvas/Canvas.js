import React, { useRef, useEffect } from 'react';

const Canvas = ({ draw }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // get DPI
    const dpi = window.devicePixelRatio;
    // get canvas
    const canvas = canvasRef.current;
    // get context
    const context = canvas.getContext('2d');
    const fixDpi = () => {
      // get CSS height
      // the + prefix casts it to an integer
      // the slice method gets rid of "px"
      const style_height = +getComputedStyle(canvas).getPropertyValue('height').slice(0, -2);
      // get CSS width
      const style_width = +getComputedStyle(canvas).getPropertyValue('width').slice(0, -2);
      // scale the canvas
      canvas.setAttribute('height', style_height * dpi);
      canvas.setAttribute('width', style_width * dpi);
    };

    fixDpi();

    const {
      canvas: { clientWidth: width },
      canvas: { clientHeight: height },
    } = context;
    const magicNumber = width / 55;
    draw(context, magicNumber);
  }, [draw]);

  return <canvas ref={canvasRef} height={100} width={100} className='canvas' />;
};

export default Canvas;
