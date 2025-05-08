import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/auth';
import axios from 'axios';
import Modal from '../Modal';
import { InventoryForm } from '../InventoryForm';

const InvetoryTable = () => {
  const [date, setDate] = useState('');
  const [productos, setProductos] = useState([]);
  const [selectProduct, setSelectProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const token = useAuthStore((state) => state.token);

  const openModal = (producto) => {
    console.log("Producto seleccionado:", producto);
    setSelectProduct(producto);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get(
          'https://back-navarro-pos.duckdns.org/products/entries?startDate=2025-01-01&endDate=2025-05-03&departmentName=TODOS%20LOS%20DEPARTAMENTOS',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProductos(response.data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

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
