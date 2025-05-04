import React, { useState } from 'react';
import Menu from '../components/Menu'
import ProductosTable from '../mocks/ProductosTable'
import { InventoryForm } from '../components/InventoryForm'
import Modal from '../components/Modal'
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
    <div className="container mt-4 pb-5">
     
      {/* Línea 1: Código de barras */}
      <div className="row align-items-center mb-3">
        <div className="col-auto">
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
        <div className="row mb-3">
        <div className="col-auto">
          <button className="btn btn-outline-secondary me-2" onClick={openModal} >Agregar </button>
          
        </div>
      </div>

      

      {/* Línea 3: TabPane con tabla */}
      <div className="row mb-5">
        <div className="col">
          <div className="card">
            
            <div className="card-body p-0">
             <ProductosTable/>
            </div>
          </div>
        </div>
      </div>

     
    </div>

    <Modal showModal={showModal} handleClose={closeModal}>
          <InventoryForm />
        </Modal>

    </>
  )
}
