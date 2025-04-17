import React, { useState } from 'react';
import Menu from '../components/Menu'
export const Products = () => {
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
          <button className="btn btn-outline-secondary me-2">Registrar</button>
          
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
                        <th>Codigo</th>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Total</th>
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
                            <button className="btn btn-sm btn-success " onClick>
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
    </>
  )
}
