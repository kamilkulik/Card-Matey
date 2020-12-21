import React, { useState } from 'react';
import Carousel from './Carousel';
import logos from '../canvas/CanvasLogos';
import Canvas from '../canvas/Canvas';

const CarouselContainer = ({ logo, setLogo }) => {
  const selectedLogo = logos.find((logoItem) => logoItem.name === logo);
  const initialLogo = logos.indexOf(selectedLogo);

  const [carouselPage, setCarouselPage] = useState(initialLogo);

  React.useEffect(() => {
    const selectedLogo = logos[carouselPage].name;
    setLogo(selectedLogo);
  }, [carouselPage]);

  const transitionDur = 500;

  return (
    <div className='wrapper'>
      <Carousel transitionDuration={transitionDur} slides={logos} pageNo={setCarouselPage}>
        <div className='wrapper__content'>
          <Canvas draw={logos[carouselPage].draw} />
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselContainer;
