import React, { useState } from 'react';
import Menu from '../components/Menu'
import { OrderTable } from '../mocks/OrderTable'
import Modal from '../components/Modal'; 
import { OrderServiceForm } from '../components/OrderServiceForm';
export const Repair = () => {

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
    <Menu/>

    <div className="container mt-4">
       {/* Línea 2: Botones debajo del input */}
       <div className="row mb-3">
        <div className="col-auto">
          <button className="btn btn-outline-secondary me-2" onClick={openModal}>Registrar orden</button>
         
        </div>
      </div>
   <OrderTable/> 
    </div>

    <Modal showModal={showModal} handleClose={closeModal}>
 <OrderServiceForm /> 
</Modal>
     
    </>
  )
}
