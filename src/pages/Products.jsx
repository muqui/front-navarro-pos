import React, { useState } from 'react';
import Menu from '../components/Menu'
import { productosMock } from "../mockData/products";
import Modal from '../components/Modal';
import ProductForm from '../components/ProductForm';
import { DepartmentForm } from '../components/DepartmentForm';
import { TableProducts } from '../components/products/TableProducts';
export const Products = () => {
  const [productos, setProductos] = useState(productosMock);
 const [activeModal, setActiveModal] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = (modalName) => {
    console.log("abrir")
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };



  return (
    <>
      <Menu />
      <div className="container-fluid mt-4 pb-5">

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
            <button className="btn btn-outline-secondary me-2"  onClick={() => openModal('product')}>Registrar</button>

          </div>
          <div className="col-auto">
            <button className="btn btn-outline-secondary me-2"  onClick={() => openModal('department')}>Crear departamento</button>

          </div>
        </div>



        {/* Línea 3: TabPane con tabla */}
        <div className="row mb-5">
          <div className="col">
          <TableProducts />
          </div>
        </div>


      </div>

    

     


      {activeModal === 'product' && (
         <Modal showModal={true} handleClose={closeModal}>
         <ProductForm />
       </Modal>
      )}

{activeModal === 'department' && (
        <Modal showModal={true} handleClose={closeModal}>
        <DepartmentForm />
      </Modal>
      )}

    </>
  )
}
