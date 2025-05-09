import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/auth';
import axios from 'axios';
import Modal from '../Modal';
import { InventoryForm } from '../InventoryForm';
//import { buildUrl, API_URLS } from '../config/apiConfig'; // Importa la configuración
import { buildUrl, API_URLS } from '../../config/apiConfig'; // Importa la configuración


const InvetoryTable = () => {
  const [date, setDate] = useState('');
  const [productos, setProductos] = useState([]);
  const [selectProduct, setSelectProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

   // Fechas y departamento
   const [startDate, setStartDate] = useState('2025-01-01');
   const [endDate, setEndDate] = useState('2025-05-03');
   const [departmentName, setDepartmentName] = useState('TODOS LOS DEPARTAMENTOS');

  const token = useAuthStore((state) => state.token);

  const openModal = (producto) => {
    console.log("Producto seleccionado:", producto);
    setSelectProduct(producto);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const fetchProductos = async () => {
    try {
      //const url = `https://back-navarro-pos.duckdns.org/products/entries?startDate=${startDate}&endDate=${endDate}&departmentName=${encodeURIComponent(departmentName)}`;
      const url = `${buildUrl(API_URLS.entriesProducts)}?startDate=${startDate}&endDate=${endDate}&departmentName=${encodeURIComponent(departmentName)}`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProductos(response.data);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  // Cargar productos cuando hay token
  useEffect(() => {
    if (token) {
      fetchProductos();
    }
  }, [token]);

  useEffect(() => {
    const ahora = new Date();
    setDate(ahora.toLocaleString('es-MX'));
  }, []);

  return (
    <div className="container mt-4">
           <h4>Filtrar Inventario</h4>
      <div className="row g-3 mb-3">
        <div className="col-md-3">
          <label className="form-label">Fecha Inicio</label>
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Fecha Fin</label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Departamento</label>
          <input
            type="text"
            className="form-control"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
          />
        </div>
        <div className="col-md-2 d-flex align-items-end">
          <button onClick={fetchProductos} className="btn btn-primary w-100">
            Buscar
          </button>
        </div>
      </div>
      <p>Últimos productos agregados al inventario</p>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th className='d-none d-md-table-cell'>Fecha</th>
            <th className='d-none d-md-table-cell'>Código</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th className='d-none d-md-table-cell'>Precio compra</th>
            <th>Total Compra</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id} onClick={() => openModal(producto)}>
              <td className='d-none d-md-table-cell'>{new Date(producto.date).toLocaleDateString('es-MX')}</td>
              <td className='d-none d-md-table-cell'>{producto.product?.barcode || '—'}</td>
              <td>{producto.product?.name || 'Sin nombre'}</td>
              <td>{parseFloat(producto.amount).toFixed(2)}</td>
              <td className='d-none d-md-table-cell'>${parseFloat(producto.purchasePrice).toFixed(2)}</td>
              <td>${parseFloat(producto.purchaseTotalPrice).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal showModal={showModal} handleClose={closeModal}>
        <InventoryForm product={selectProduct} />
      </Modal>
    </div>
  );
};

export default InvetoryTable;
