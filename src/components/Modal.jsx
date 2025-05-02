import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import closeIcon from '../assets/close.png';

const Modal = ({ showModal, handleClose, children }) => {
  useEffect(() => {
    // Función que maneja el evento de la tecla Esc
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    // Solo agregamos el listener si el modal se muestra
    if (showModal) {
      document.addEventListener('keydown', handleKeyDown);
    }

    // Limpiar el listener cuando el componente se desmonte o el modal se cierre
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showModal, handleClose]);

  if (!showModal) return null;

  return (
    <div className="modal d-block bg-dark bg-opacity-50" tabIndex="-1" style={{ zIndex: 1050 }}>
      <div className="modal-dialog  modal-dialog-custom ">
        <div className="modal-content position-relative p-4">
          <button
            type="button"
           className=" p-0 btn position-absolute top-0 end-0 me-2 d-flex align-items-center justify-content-center "
            aria-label="Close"
            onClick={() => {
              console.log('Botón cerrar clickeado');
              handleClose();
            }}
          
          >
            <img src={closeIcon} alt="Cerrar" width="30" height="30" />
            
            </button>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
