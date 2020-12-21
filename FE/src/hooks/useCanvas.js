import { useEffect, useRef } from 'react';

const canvasResize = (canvas) => {
  const { width, height } = canvas.getBoundingClientRect();

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    return true;
  }

  return false;
};

const useCanvas = (draw) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    // canvasResize(canvas)
    draw(context);
  }, [draw]);

  return canvasRef;
};

export default useCanvas;
