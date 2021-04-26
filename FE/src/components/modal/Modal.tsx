import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

interface ModalThingProps {
  modalIsOpen: boolean;
  setModalIsOpen(T: boolean): void;
  handleDelete(T: boolean): void;
}

const ModalThing: React.FC<ModalThingProps> = ({ modalIsOpen, setModalIsOpen, handleDelete }) => {
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={modalIsOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <h1>Are you sure you want to delete this card?</h1>
      <button className="button" onClick={() => handleDelete(true)} style={{ marginRight: '2rem' }} type="button">
        Delete
      </button>
      <button className="button" onClick={() => handleDelete(false)} type="button">
        Cancel
      </button>
    </Modal>
  );
};

ModalThing.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  setModalIsOpen: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default ModalThing;
