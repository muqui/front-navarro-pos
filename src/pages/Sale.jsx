import React, { useState } from 'react';
import Menu from '../components/Menu';

export const Sale = () => {
    const [productos, setProductos] = useState([
        {
          codigo: '7501008920015',
          nombre: 'Coca Cola 600ml',
          precio: 15.00,
          cantidad: 2,
        },
        {
          codigo: '7501020543217',
          nombre: 'Sabritas Adobadas',
          precio: 18.00,
          cantidad: 1,
        },
        {
          codigo: '7501008920016',
          nombre: 'Fanta Naranja 600ml',
          precio: 14.00,
          cantidad: 3,
        },
        {
          codigo: '7501008920017',
          nombre: 'Sprite 600ml',
          precio: 16.00,
          cantidad: 4,
        },
        {
          codigo: '7501020543218',
          nombre: 'Doritos Nachos',
          precio: 20.00,
          cantidad: 2,
        },
       
      
      ]);
      

  // Función para eliminar producto
  const eliminarProducto = (codigo) => {
    setProductos(productos.filter(producto => producto.codigo !== codigo));
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
          <button className="btn btn-primary">Agregar</button>
        </div>
      </div>

      {/* Línea 2: Botones debajo del input */}
      <div className="row mb-3">
        <div className="col-auto">
          <button className="btn btn-outline-secondary me-2">Buscar</button>
          <button className="btn btn-outline-secondary me-2">Insertar más de 1</button>
          <button className="btn btn-outline-secondary">Descuento</button>
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
                  <table className="table table-striped table-hover mb-0">
                    <thead>
                      <tr>
                        <th>Codigo</th>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                        <th></th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Aquí irán las filas de productos */}
                      {productos.map((producto, index) => (
                        <tr key={index}>
                          <td>{producto.codigo}</td>
                          <td>{producto.nombre}</td>
                          <td>${producto.precio.toFixed(2)}</td>
                          <td>{producto.cantidad}</td>
                          <td>${(producto.precio * producto.cantidad).toFixed(2)}</td>

                          <td>
                            <button className="btn btn-sm btn-success w-100">+ </button>
                          </td>
                          <td>
                            <button className="btn btn-sm btn-warning w-100">-</button>
                          </td>
                          <td>
                            <button className="btn btn-sm btn-danger " onClick={() => eliminarProducto(producto.codigo)}>
                              Eliminar
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
        <div className="container">
          <div className="row align-items-center mb-2">
            <div className="col">
              <button className="btn btn-success me-2">Crear Ticket</button>
              <button className="btn btn-warning me-2">Cambiar Ticket</button>
              <button className="btn btn-danger">Borrar Ticket</button>
            </div>
            <div className="col text-end">
              <span className="fs-4 fw-bold">Total: $0.00</span>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col">
              <span className="fw-bold">Total de productos: 0</span>
            </div>
            <div className="col text-end">
              <button className="btn btn-primary btn-lg">Cobrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
