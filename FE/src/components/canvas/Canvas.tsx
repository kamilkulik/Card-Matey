import React, { useRef, useEffect } from 'react';
import { CanvasLogo } from '../../shared';

type Draw = CanvasLogo['draw'];

const Canvas = ({ draw }: { draw: Draw }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // get DPI
    const dpi = window.devicePixelRatio;
    // get canvas
    const canvas = canvasRef.current as HTMLCanvasElement;
    // get context
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    const fixDpi = () => {
      // get CSS height
      // the + prefix casts it to an integer
      // the slice method gets rid of "px"
      const styleHeight = +getComputedStyle(canvas).getPropertyValue('height').slice(0, -2);
      // get CSS width
      const styleWidth = +getComputedStyle(canvas).getPropertyValue('width').slice(0, -2);
      // scale the canvas
      canvas.setAttribute('height', String(styleHeight * dpi));
      canvas.setAttribute('width', String(styleWidth * dpi));
    };

    fixDpi();

    const {
      canvas: { clientWidth: width },
    } = context;
    const magicNumber = width / (100 / dpi);
    draw(context, magicNumber);
  }, [draw]);

  return <canvas ref={canvasRef} height={100} width={100} className="canvas" />;
};

export default Canvas;
