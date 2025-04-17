import React, { useState, useEffect } from 'react';
import { productosMock } from "../mockData/products";

const ProductosTable = () => {
  const [date, setDate] = useState('');
  const [productos, setProductos] = useState(productosMock);


  useEffect(() => {
    const ahora = new Date();
    setDate(ahora.toLocaleString('es-MX'));
  }, []);
  return (
    <div className="container mt-4">
      <p>Ultimos productos agregados al inventario</p>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Fecha</th>
            <th>Codigo</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Precio compra</th>
            <th>Total Compra</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.codigo}>
               <td>{date}</td>
              <td>{producto.codigo}</td>
              <td>{producto.nombre}</td>
              <td>{producto.cantidad}</td>
              <td>${producto.precio.toFixed(2)}</td>           
              <td>${(producto.precio * producto.cantidad).toFixed(2)}</td>          
              <td><button className="btn btn-sm btn-success " onClick>Ver</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductosTable;
