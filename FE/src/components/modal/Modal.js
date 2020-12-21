import React from 'react'
import Modal from 'react-modal'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

const ModalThing = ({ modalIsOpen, setModalIsOpen, handleDelete }) => {
  const closeModal = () => {
    setModalIsOpen(false)
  }

  return (
    <div>
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <h1>Are you sure you want to delete this card?</h1>
        <button className='button' onClick={handleDelete(true)} style={{ marginRight: '2rem' }}>
          Delete
        </button>
        <button className='button' onClick={handleDelete(false)}>
          Cancel
        </button>
      </Modal>
    </div>
  )
}

export default ModalThing
