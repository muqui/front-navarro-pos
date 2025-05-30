import React, { useState } from 'react';
import Menu from '../components/Menu';
import { productosMock } from "../mockData/products";
import Modal from '../components/Modal';
import ProductForm from '../components/ProductForm';
import { DepartmentForm } from '../components/DepartmentForm';
import { TableProducts } from '../components/products/TableProducts';
import debounce from 'lodash.debounce';
export const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [productos, setProductos] = useState(productosMock);
  const [activeModal, setActiveModal] = useState(null);
  const [page, setPage] = useState(1); // ✅

  const openModal = (modalName) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // ✅ Buscar automáticamente al escribir
  const handleInputChange = (e) => {
    const value = e.target.value;
    setPage(1); // Reinicia la página
    //setSearchTerm(value.trim());
    setSearchTerm(value);
    console.log("Buscando:", value);
  };

  return (
    <>
      <Menu />
      <div className="container-fluid mt-4 pb-5">

        {/* Búsqueda */}
        <div className="row align-items-center mb-3">
          <div className="col-auto">
            <label htmlFor="barcodeInput" className="form-label fw-bold">Nombre</label>
          </div>
          <div className="col">
            <input
              type="text"
              id="barcodeInput"
              className="form-control"
              placeholder="Nombre"
              value={searchTerm}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Botones */}
        <div className="row mb-3">
          <div className="col-auto">
            <button className="btn btn-outline-secondary me-2" onClick={() => openModal('product')}>Registrar</button>
          </div>
          <div className="col-auto">
            <button className="btn btn-outline-secondary me-2" onClick={() => openModal('department')}>Crear departamento</button>
          </div>
        </div>

        {/* Tabla */}
        <div className="row mb-5">
          <div className="col">
            <TableProducts searchTerm={searchTerm} page={page} setPage={setPage} />
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
  );
};
