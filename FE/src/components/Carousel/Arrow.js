import React from 'react';

const Arrow = ({ previous, next, controls }) => {
  let direction;
  if (previous) direction = 'previous';
  else if (next) direction = 'next';

  return (
    <button
      className={`arrow ${direction}`}
      onClick={previous ? controls('previous') : controls('next')}
    />
  );
};

export default Arrow;
