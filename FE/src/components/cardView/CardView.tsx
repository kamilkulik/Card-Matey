import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { CSSTransition } from 'react-transition-group';
import { useActions } from '../../hooks/useActions';
// import { startDeleteCard, startUpdateCard, startAddCard } from '../../state/actionCreators';
import filterCardProps from '../../utilities/filterCardProps';
import CardContainer from '../businessCard/CardContainer';
import CardForm from '../businessCard/CardForm';
import { colours } from '../businessCard/CardPatterns';
import ThemePreview from '../previewBox/ThemePreview';
import LogoPreview from '../previewBox/LogoPreview';
import Modal from '../modal/Modal';
import { Card, CardSpec, FormFields, Updates } from '../../shared';

const CardView = () => {
  const { id } = useParams<{ id: string}>();
  const card = useTypedSelector((state) => state.cards.find((savedCard) => savedCard.id === id)) as Card;
  const cardSpec = id && Object.prototype.hasOwnProperty.call(card, 'cardSpec');
  const savedSpec = (cardSpec && card?.cardSpec) || { logo: 'squares', theme: 'none', colour: 'Black'};
  const cleanDataObject = filterCardProps(card);

  const initialState = {
    firstName: 'First Name',
    lastName: 'Last Name',
    mobile: 'Mobile',
    email: 'Email',
    website: 'Website',
    ...cleanDataObject,
  };
  const [formFields, setFormFields] = useState<FormFields>(initialState);
  const [cardSpecState, setCardSpecState] = useState<{ logo: string, theme:string, colour: string }>({
    logo: savedSpec.logo || 'squares',
    theme: savedSpec.theme || 'none',
    colour: savedSpec.colour || 'Black',
  });
  const { logo, theme, colour } = cardSpecState;

  const [edit, setEdit] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const { startDeleteCard, startUpdateCard, startAddCard } = useActions()
  const history = useHistory();

  const goBack = () => {
    history.back();
  };

  const handleEdit = (bool: boolean) => () => {
    setEdit(bool);
  };

  const handleOnSubmit = () => {
    const updates: Card = { ...formFields, cardSpec: { logo, theme, colour } };
    // add validation so you don't add the same card twice
    if (!id) {
      startAddCard(updates);
      setEdit(false);
    } else {
      startUpdateCard(updates, id);
      setEdit(false);
    }
  };

  const handleSelect = (name: string, value: string) => {
    setCardSpecState({ ...cardSpecState, [name]: value });
  };

  const handleDelete = (response: boolean) => () => {
    if (response) {
      startDeleteCard(id);
      history.push('/');
    } else setModalIsOpen(false);
  };

  return (
    <div className="cardView">
      <Modal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} handleDelete={handleDelete} />
      <div className="cardView__preview">
        <div className="cardView__preview-buttons">
          <button className="button" onClick={goBack} type="button">
            &larr; Back
          </button>
          <button className="button" onClick={handleEdit(!edit)} type="button">
            Edit
          </button>
        </div>
        <div className="cardView__preview-container">
          <CardContainer spec={{ logo, theme, colour }}>
            <CardForm id={id} edit={edit} formFields={formFields} setFormFields={setFormFields} />
          </CardContainer>
        </div>
      </div>
      <CSSTransition
        in={edit}
        timeout={{
          enter: 500,
          exit: 5000,
        }}
        classNames="editSlide"
        unmountOnExit
      >
        <div className="cardView__theme">
          <div className="cardView__theme-buttons">
            <button className="button" onClick={handleOnSubmit} type="button">
              Save
            </button>
            <button className="button" onClick={() => setModalIsOpen(true)} type="button">
              Delete Card
            </button>
          </div>
          <h1>Select card background</h1>
          <div className="cardView__theme-colours">
            {!(theme === 'none') &&
              colours.map((singleColour) => (
                <div
                  style={{ backgroundColor: singleColour.name }}
                  key={singleColour.name}
                  onClick={() => handleSelect('colour', singleColour.name)}
                  className={colour === singleColour.name ? 'active' : undefined}
                  role="button"
                  aria-label={singleColour.name}
                  tabIndex={0}
                />
              ))}
          </div>
          <ThemePreview savedTheme={theme} handleSelect={handleSelect} />
          <h1>Select your logo</h1>
          <LogoPreview savedLogo={logo} handleSelect={handleSelect} />
        </div>
      </CSSTransition>
    </div>
  );
};

export default CardView;
