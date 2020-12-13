import React, { useState } from 'react'
import Modal from 'react-modal'

const ModalThing = ({ deleteCard }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <div>
      <Modal>
        <button className='button' onClick={deleteCard}>
          Delete
        </button>
      </Modal>
    </div>
  )
}

export default ModalThing
