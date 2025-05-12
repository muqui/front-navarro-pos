import React, { useState, useEffect } from 'react';
import { productosMock } from '../../mockData/products';
import { usersMock } from '../../mockData/Users';
//import { productosMock } from "../mockData/products";
//import { usersMock } from "../mockData/Users";

export const SellsTable = () => {
     const [date, setDate] = useState('');
      const [productos, setProductos] = useState(productosMock);
      const [users, setUsers] = useState(usersMock);

      const [startDate, setStartDate] = useState('');
      const [endDate, setEndDate] = useState('');
      const [selectedUser, setSelectedUser] = useState('');
      const [selectedDepartment, setSelectedDepartment] = useState('');
    
      const [filteredProducts, setFilteredProducts] = useState([]);

     useEffect(() => {
        const ahora = new Date();
        setDate(ahora.toLocaleString('es-MX'));
      }, []);
  return (
    <div className="container mt-4">
      <h4>Filtros</h4>
      <div className="row mb-3">
        <div className="col-md-3">
          <label>Fecha de inicio:</label>
          <input type="date" className="form-control" value={startDate} onChange={e => setStartDate(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label>Fecha final:</label>
          <input type="date" className="form-control" value={endDate} onChange={e => setEndDate(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label>Usuario:</label>
          <select className="form-control" value={selectedUser} onChange={e => setSelectedUser(e.target.value)}>
            <option value="">Todos</option>
            {users.map(user => (
              <option key={user.id} value={user.name}>{user.name}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <label>Departamento:</label>
          <select className="form-control" value={selectedDepartment} onChange={e => setSelectedDepartment(e.target.value)}>
            <option value="">Todos</option>
         
          </select>
        </div>
      </div>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th className="d-none d-md-table-cell">Fecha</th>
            <th className="d-none d-md-table-cell">Usuario</th>
            <th className="d-none d-md-table-cell">Código</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th className="d-none d-md-table-cell">Compra</th>
            <th className="d-none d-md-table-cell">Beneficio</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">No hay productos que coincidan con los filtros.</td>
            </tr>
          ) : (
            filteredProducts.map((producto) => (
              <tr key={producto.codigo}>
                <td className="d-none d-md-table-cell">{new Date(producto.fecha).toLocaleDateString('es-MX')}</td>
                <td className="d-none d-md-table-cell">{producto.usuario}</td>
                <td className="d-none d-md-table-cell">{producto.codigo}</td>
                <td>{producto.nombre}</td>
                <td>{producto.cantidad}</td>
                <td>${(producto.precio * producto.cantidad).toFixed(2)}</td>
                <td className="d-none d-md-table-cell">${(producto.compra * producto.cantidad).toFixed(2)}</td>
                <td className="d-none d-md-table-cell">
                  ${((producto.precio - producto.compra) * producto.cantidad).toFixed(2)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
