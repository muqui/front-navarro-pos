import React, { useState, useEffect } from 'react';

import Modal from '../../components/Modal';
import { OrderServiceForm } from '../../components/OrderServiceForm';
import axios from 'axios';
import { buildUrl, API_URLS } from '../../config/apiConfig'; // Importa la configuración
//import { buildUrl, API_URLS } from '../config/apiConfig'; // Importa la configuración
import { useAuthStore } from '../../store/auth'; // Asegúrate de tener esto configurado

export const OrderTable = ({ reload, triggerReload, startDate, endDate, status }) => {
     const [orders, setOrders] = useState([]);
       const [showModal, setShowModal] = useState(false);
       const [selectedOrder, setSelectedOrder] = useState(null);
     
       const token = useAuthStore((state) => state.token);


       useEffect(() => {
        const fetchOrders = async () => {
          try {
            const params = new URLSearchParams();

            if (startDate) params.append('startDate', startDate);
            if (endDate) params.append('endDate', endDate);
            if (status) params.append('status', status);
            const response = await axios.get(buildUrl(`${API_URLS.repairCellphones}?${params.toString()}`), {
              headers: { Authorization: `Bearer ${token}` },
            });
            setOrders(response.data);
          } catch (error) {
            console.error('Error al obtener las órdenes:', error);
          }
        };
        if (token) fetchOrders();
      }, [token, reload, startDate, endDate, status]);
    
      const openModal = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
      };
    
      const closeModal = () => {
        setSelectedOrder(null);
        setShowModal(false);
      };
  return (
    <div className="container-fluid mt-4">
      
     
    <table className="table table-bordered">
      <thead className="table-dark">
        <tr>
          <th>Fecha</th>
          <th>Cliente</th>
          <th className="d-none d-md-table-cell">Folio</th>
          <th className="d-none d-md-table-cell">Equipo</th>
          <th className="d-none d-md-table-cell">Modelo</th>
          <th className="d-none d-md-table-cell">Servicio</th>
          <th className="d-none d-md-table-cell">$ reparacion</th>
          <th className="d-none d-md-table-cell">$ refacciones</th>
          <th>Ganancia</th>
          <th className="d-none d-md-table-cell">Estado</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
  {orders.length === 0 ? (
    <tr>
      <td colSpan="11" className="text-center">No hay órdenes para mostrar.</td>
    </tr>
  ) : (
    orders.map((order) => (
      <tr key={order.id}>
        <td>{new Date(order.date).toLocaleDateString('es-MX')}</td>
        <td>{order.client}</td>
        <td className="d-none d-md-table-cell">{order.folio}</td>
        <td className="d-none d-md-table-cell">{order.brand}</td>
        <td className="d-none d-md-table-cell">{order.model}</td>
        <td className="d-none d-md-table-cell">{order.service}</td>
        <td className="d-none d-md-table-cell">{order.repair_cost}</td>
        <td className="d-none d-md-table-cell">{order.replacementCost}</td>
        <td>{order.profit}</td>
        <td className="d-none d-md-table-cell">{order.status}</td>
        <td>
          <button className="btn btn-sm btn-success" onClick={() => openModal(order)}>
            Ver
          </button>
        </td>
      </tr>
    ))
  )}
</tbody>
    </table>
    <Modal showModal={showModal} handleClose={closeModal}>
  {selectedOrder && (
    <OrderServiceForm
      folio={selectedOrder.folio}
      onSuccess={() => {
        triggerReload();
        closeModal();
      }}
    />
  )}
</Modal>
     
  </div>
  )
}
