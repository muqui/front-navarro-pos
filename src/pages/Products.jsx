import React, { useState } from 'react';
import Menu from '../components/Menu'
import { productosMock } from "../mockData/products";
import Modal from '../components/Modal';
import ProductForm from '../components/ProductForm';
import { DepartmentForm } from '../components/DepartmentForm';
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
            <button className="btn btn-outline-secondary me-2"  onClick={() => openModal('product')}>Registrar</button>

          </div>
          <div className="col-auto">
            <button className="btn btn-outline-secondary me-2"  onClick={() => openModal('department')}>Crear departamento</button>

          </div>
        </div>



        {/* Línea 3: TabPane con tabla */}
        <div className="row mb-5">
          <div className="col">
            <div className="card">

              <div className="card-body p-0">
                <div className="tab-content" id="myTabContent">
                  <div className="tab-pane fade show active p-3" id="tab1" role="tabpanel">
                    <table className="table table-striped table-hover mb-0">
                      <thead>
                        <tr>
                          <th className="d-none d-md-table-cell">Codigo</th>
                          <th>Producto</th>
                          <th className="d-none d-md-table-cell">Precio</th>
                          <th>Cantidad</th>
                          <th>Total</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Aquí irán las filas de productos */}
                        {productos.map((producto, index) => (
                          <tr key={index}>
                            <td className="d-none d-md-table-cell"> {producto.codigo}</td>
                            <td>{producto.nombre}</td>
                            <td>${producto.precio.toFixed(2)}</td>
                            <td className="d-none d-md-table-cell">{producto.cantidad}</td>
                            <td>${(producto.precio * producto.cantidad).toFixed(2)}</td>


                            <td>
                              <button className="btn btn-sm btn-success " onClick={() => openModal('product')}>
                                Ver
                              </button>
                            </td>
                          </tr>
                        ))}

                        {productos.length === 0 && (
                          <tr>
                            <td colSpan="8" className="text-center text-muted">No hay productos agregados</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                </div>
              </div>
            </div>
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
