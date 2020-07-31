import React from 'react'
import Modal from 'react-modal'

function OwnModal({ openModal, closeModal, onCancel, onSuccess, body }) {
    return (
        <Modal
            isOpen={openModal}
            onRequestClose={closeModal}
            style={{
                content: {
                    width: '50%',
                    height: '20%',
                    top: '40%',
                    left: '25%'
                }
            }}
        >
            <div className="modal-aspi">
                <p>{body}</p>
                <div className="btn-container">
                    <button onClick={onCancel} className="btn-aspi">CANCELAR</button>
                    <button onClick={onSuccess} className="btn-aspi">OKAY</button>
                </div>
            </div>
        </Modal>
    )
}

export default OwnModal
