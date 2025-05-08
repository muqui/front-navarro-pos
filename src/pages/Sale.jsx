import React, { useState } from "react";
import Menu from '../components/Menu';
import Modal from '../components/Modal';
import { FindProduct } from '../components/FindProduct';
import { InsertMoreThanOne } from '../components/InsertMoreThanOne';
import { Discount } from '../components/Discount';
import { TicketTable } from '../mocks/TicketTable';

export const Sale = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

   const [selectedProducts, setSelectedProducts] = useState([]);
  
    const handleAddProduct = (product) => {
      console.log(product)
      setSelectedProducts((prev) => [...prev, product]);
    };


  const openModal = (modalName) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

 



  return (
    <>
      <Menu />
      <div className="container mt-4 pb-5">

      <div className="row align-items-center mb-2">
  <div className="col-12 d-flex justify-content-between flex-wrap gap-2">
    <div className="col-auto">
      <label htmlFor="barcodeInput" className="form-label fw-bold">Código de barras</label>
    </div>
    <div className="col">
      <input
        type="text"
        id="barcodeInput"
        className="form-control"
        placeholder="Escribe el código de barras"
      />
    </div>
    <div className="col-auto">
      <button className="btn btn-primary btn-sm btn-md-lg">Agregar</button>
    </div>
  </div>
</div>


        <div className="row mb-2">
  <div className="col-12 d-flex justify-content-between flex-wrap gap-2">
    <div className="d-flex flex-wrap gap-2">
      <button
        className="btn btn-outline-secondary btn-sm btn-md-lg"
        onClick={() => openModal('findProduct')}
      >
        Buscar
      </button>
      <button
        className="btn btn-outline-secondary btn-sm btn-md-lg"
        onClick={() => openModal('insertMoreThanOne')}
      >
        Insertar más de 1
      </button>
      <button
        className="btn btn-outline-secondary btn-sm btn-md-lg"
        onClick={() => openModal('discount')}
      >
        Descuento
      </button>
    </div>
  </div>
</div>



        {/* Línea 3: TabPane con tabla */}
        <div className="row mb-5">
          <div className="col">
            <div className="card">
              <div className="card-header">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="tab1-tab" data-bs-toggle="tab" data-bs-target="#tab1" type="button" role="tab">
                      Ticket 1
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="tab2-tab" data-bs-toggle="tab" data-bs-target="#tab2" type="button" role="tab">
                      Ticket 2
                    </button>
                  </li>
                </ul>
              </div>
              <div className="card-body p-0">
                <div className="tab-content" id="myTabContent">
                  <div className="tab-pane fade show active p-3" id="tab1" role="tabpanel">
                   <TicketTable />
                  </div>
                  <div className="tab-pane fade p-3" id="tab2" role="tabpanel">
                    {/* Aquí puede ir el contenido para la pestaña "Otros" */}
                    <p>Contenido para otras opciones</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer fijo: línea 4 y 5 */}
        <div className="fixed-bottom bg-light border-top shadow-lg p-3">
        <div className="container py-2">
  <div className="row align-items-center justify-content-between g-2">
    
    {/* Botones de acciones y botón Cobrar */}
    <div className="col-12 d-flex justify-content-between flex-wrap gap-2">
      <div className="d-flex flex-wrap gap-2">
        <button className="btn btn-success btn-sm btn-md-lg">Crear</button>
        <button className="btn btn-warning btn-sm btn-md-lg">Cambiar</button>
        <button className="btn btn-danger btn-sm btn-md-lg">Borrar</button>
      </div>
      <button className="btn btn-primary btn-sm btn-md-lg">Cobrar</button>
    </div>

    {/* Totales */}
    <div className="col-12 d-flex justify-content-between small mt-2">
      <span className="fw-bold">Total: $0.00</span>
      <span className="fw-bold">Productos: 0</span>
    </div>
  </div>
</div>

        </div>
      </div>


   {/* Modals dinámicos */}
   {activeModal === 'findProduct' && (
        <Modal showModal={true} handleClose={closeModal}>
          <FindProduct onSelectProduct={handleAddProduct} onClose={closeModal}  />
        </Modal>
      )}

      {activeModal === 'insertMoreThanOne' && (
        <Modal showModal={true} handleClose={closeModal}>
          <InsertMoreThanOne />
        </Modal>
      )}

      {activeModal === 'discount' && (
        <Modal showModal={true} handleClose={closeModal}>
          <Discount />
        </Modal>
      )}
   
    </>
  );
};
