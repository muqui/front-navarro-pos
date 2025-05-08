import React, { useState } from 'react';
import Menu from '../components/Menu'
import ProductosTable from '../mocks/ProductosTable'
import { InventoryForm } from '../components/InventoryForm'
import Modal from '../components/Modal'
import InvetoryTable from '../components/inventory/InventoryTable';
export const Inventory = () => {
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
    <div className="container mt-2 mb-1 ">
         {/* Línea 1: Código de barras */}
         <div className="row align--center mb-2">
        <div className="col-12 col-md-auto mb-2 mb-md-0">
          <label htmlFor="barcodeInput" className="form-label fw-bold">Código de barras</label>
        </div>
        <div className="col">
          <input type="text" id="barcodeInput" className="form-control" placeholder="Escribe el código de barras" />
        </div>
        <div className="col-auto">
          <button className="btn btn-primary">Buscar</button>
        </div>
      </div>

        {/* Línea 2: Botones debajo del input */}
        <div className="row">
        <div className="col-auto">
          <button className="btn btn-outline-secondary me-2" onClick={openModal} >Agregar </button>
          
        </div>
      </div>
      
    </div>

    <div className="container-fluid mt-0 ">
     
   

      

      {/* Línea 3: TabPane con tabla */}
      <div className="row mb-5">
        <div className="col">
        
            
           
             <InvetoryTable/>
           
         
        </div>
      </div>

     
    </div>

    <Modal showModal={showModal} handleClose={closeModal}>
          <InventoryForm />
        </Modal>

    </>
  )
}
