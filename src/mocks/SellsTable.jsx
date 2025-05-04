import React, { useState, useEffect } from 'react';
import { productosMock } from "../mockData/products";
import { usersMock } from "../mockData/Users";

export const SellsTable = () => {
     const [date, setDate] = useState('');
      const [productos, setProductos] = useState(productosMock);
      const [users, setUsers] = useState(usersMock);
     useEffect(() => {
        const ahora = new Date();
        setDate(ahora.toLocaleString('es-MX'));
      }, []);
  return (
    <div className="container mt-4">
     
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th className="d-none d-md-table-cell">Fecha</th>
            <th className="d-none d-md-table-cell" >Usuario</th>
            <th className="d-none d-md-table-cell">Codigo</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th className="d-none d-md-table-cell">compra</th>
            <th className="d-none d-md-table-cell">Beneficio</th>

          
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.codigo}>
               <td className="d-none d-md-table-cell" >{date}</td>
              <td className="d-none d-md-table-cell" >{users[0].name}</td>
              <td className="d-none d-md-table-cell">{producto.codigo}</td>
              <td>{producto.nombre}</td>
              <td>{producto.cantidad}</td>           
              <td>${(producto.precio * producto.cantidad).toFixed(2)}</td>          
              <td className="d-none d-md-table-cell">${(producto.compra * producto.cantidad).toFixed(2)}</td>
              <td className="d-none d-md-table-cell">${((producto.precio * producto.cantidad) - (producto.compra * producto.cantidad)).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
