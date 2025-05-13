import React, { useState, useEffect } from 'react';
import { usersMock } from '../../mockData/Users';
import axios from 'axios';
import { useAuthStore } from '../../store/auth';
import { buildUrl, API_URLS } from '../../config/apiConfig'; // Importa la configuración
import { SelectUser } from '../SelectUser';
export const SellsTable = () => {
  const formatDate = (date) => date.toISOString().split('T')[0];
  const today = new Date();
  const [date, setDate] = useState('');
  const [productos, setProductos] = useState([]);
  const [users, setUsers] = useState(usersMock);
  const [totales, setTotales] = useState({
    totalPrice: 0,
    totalPurchasePrice: 0,
    profit: 0
  });
  const [startDate, setStartDate] = useState(formatDate(today));
  const [endDate, setEndDate] = useState(formatDate(today));
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');


  const token = useAuthStore((state) => state.token);
  useEffect(() => {
    const ahora = new Date();
    setDate(ahora.toLocaleString('es-MX'));
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      console.log('Ejecuto fetchData con:', {
        startDate,
        endDate,
        selectedUser,
        selectedDepartment
      });
      const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    if (selectedUser) params.append('userName', selectedUser);
    if (selectedDepartment) params.append('departmentName', selectedDepartment);
      const url =buildUrl(`${API_URLS.orderSolds}?${params.toString()}`)
      console.log(url)
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }); // Axios reemplaza fetch aquí
        const data = response.data;
        console.log(data)
        // Asignamos orderDetails directamente a productos
        setProductos(data.orderDetails);
        setTotales({
          totalPrice: data.totalPrice || 0,
          totalPurchasePrice: data.totalPurchasePrice || 0,
          profit: data.profit || 0
        });
      } catch (error) {
        console.error('Error al obtener los datos con Axios:', error);
      }
    };

    fetchData();
  }, [startDate, endDate, selectedUser, selectedDepartment]);

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
       
          <SelectUser  onUserChange={setSelectedUser} />
        </div>
        <div className="col-md-3">
          <label>Departamento:</label>
          <select className="form-control" value={selectedDepartment} onChange={e => setSelectedDepartment(e.target.value)}>
            <option value="">Todos los departamentos</option>
            <option value="papeleria">papeleria</option>

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
          {productos.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">No hay productos que coincidan con los filtros.</td>
            </tr>
          ) : (
            productos.map((producto) => (
              <tr key={producto.id}>
                <td className="d-none d-md-table-cell">{producto.order.date}</td>
                <td className="d-none d-md-table-cell">{producto.order.user.name}</td>
                <td className="d-none d-md-table-cell">{producto.product.barcode}</td>
                <td>{producto.product.name}</td>
                <td>{producto.amount}</td>
                <td>${producto.price}</td>
                <td className="d-none d-md-table-cell">${producto.purchasePrice}</td>
                <td className="d-none d-md-table-cell">
                  ${(producto.price - producto.purchasePrice).toFixed(2)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="fixed-bottom bg-light border-top shadow-lg p-3">
        <div className="container py-2">
          <div className="row align-items-center justify-content-between g-2">
            {/* Totales */}
            <div className="col-12   small text-end">
            <span className="fw-bold">Total: ${totales.totalPrice.toFixed(2)}</span>
<span className="fw-bold ms-3">Total de compra: ${totales.totalPurchasePrice.toFixed(2)}</span>
<span className="fw-bold ms-3">Ganancia: ${totales.profit.toFixed(2)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
