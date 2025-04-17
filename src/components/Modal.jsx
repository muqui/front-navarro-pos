// Modal.js
import React from 'react';

const Modal = ({ showModal, handleClose, children }) => {
  if (!showModal) return null;

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <button onClick={handleClose} style={closeButtonStyle}>x</button>
        {children}
      </div>
    </div>
  );
};

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1050,
};

const modalContentStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '10px',
  width: '900px',
  maxWidth: '90%',
  zIndex: 1051,
  maxHeight: '99vh',  // Agregado para limitar la altura máxima del modal
  overflowY: 'auto',  // Esto permitirá el scroll si el contenido excede el máximo

};

const closeButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  padding: '5px 5px',
  backgroundColor: 'transparent',  // Fondo transparente
  color: 'white',
  fontSize: '44px',  // Tamaño de la X
  border: 'none',
  borderRadius: '1%',
  lineHeight: '1',  
};

export default Modal;
