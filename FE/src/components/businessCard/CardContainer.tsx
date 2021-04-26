import React from 'react';
import sizeMe from 'react-sizeme';
import ThemeContext from '../../ThemeContext';
import useDynamicFont from '../../hooks/useDynamicFont';
import canvasLogos from '../canvas/CanvasLogos';
import Canvas from '../canvas/Canvas';
import { CardSpec, Theme } from '../../shared/interfaces';

interface CardContainerProps {
  size: {
    width: number;
  };
  children: React.ReactNode;
  spec: CardSpec;
}

const CardContainer: React.FC<CardContainerProps> = ({
  size: { width },
  children,
  spec: { logo: logoProp = 'squares', theme: themeProp = 'none', colour: colourProp = 'black' },
}) => {
  useDynamicFont(12, width);
  const cachedThemes: Theme[] = React.useContext(ThemeContext);
  console.log(cachedThemes);
  const colourLessTheme = cachedThemes.find((pattern) => pattern.name === themeProp)?.pattern;
  const theme = colourLessTheme?.replace('black', colourProp);

  const style = { backgroundImage: theme };

  const drawFunction = canvasLogos.find((logo) => logo.name === logoProp).draw;

  return (
    <div className="presentation" style={style}>
      <div className="presentation__canvas">
        <Canvas draw={drawFunction} key={logoProp} />
      </div>
      <div className="presentation__data">
        <div className="presentation__data-text">{children}</div>
      </div>
    </div>
  );
};

export default sizeMe()(CardContainer);
