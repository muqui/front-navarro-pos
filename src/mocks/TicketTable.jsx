import React, { useState } from 'react';

export const TicketTable = () => {
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
    <table className="table table-striped table-hover mb-0">
                      <thead>
                        <tr>
                          <th className="d-none d-md-table-cell" >Codigo</th>
                          <th>Producto</th>
                          <th className="d-none d-md-table-cell">Precio</th>
                          <th>Cantidad</th>
                          <th>Total</th>
                          <th className="d-none d-md-table-cell"></th>
                          <th className="d-none d-md-table-cell" ></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Aquí irán las filas de productos */}
                        {productos.map((producto, index) => (
                          <tr key={index}>
                            <td className="d-none d-md-table-cell" >{producto.codigo}</td>
                            <td>{producto.nombre}</td>
                            <td className="d-none d-md-table-cell" >${producto.precio.toFixed(2)}</td>
                            <td >{producto.cantidad}</td>
                            <td>${(producto.precio * producto.cantidad).toFixed(2)}</td>

                            <td className="d-none d-md-table-cell">
                              <button className="btn btn-sm btn-success w-100">+ </button>
                            </td>
                            <td className="d-none d-md-table-cell" >
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
  )
}
