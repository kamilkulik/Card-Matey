import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import filterCardData from '../../utilities/filterCardProps';

const CardText = ({ card }) => {
  const initialState = {
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    website: '',
  };
  const [formFields, setFormFields] = useState(initialState);
  const { id } = useParams();
  const reduxData = useSelector((state) => state.cards.find((card) => card.id === id));

  let cardData;
  if (!id) cardData = card;
  else cardData = reduxData;

  const cleadDataObject = filterCardData(cardData);

  useEffect(() => {
    setFormFields({ ...initialState, ...cleadDataObject });
  }, [reduxData]);

  return (
    <p>
      {formFields.firstName}
      {' '}
      {formFields.lastName}
      <br />
      {formFields.mobile}
      <br />
      {formFields.email}
      <br />
      {formFields.website}
    </p>
  );
};

export default CardText;
