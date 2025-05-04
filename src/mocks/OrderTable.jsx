import React, { useState, useEffect } from 'react';
import { orderMock } from "../mockData/order";
import Modal from '../components/Modal';
import { OrderServiceForm } from '../components/OrderServiceForm';
export const OrderTable = () => {
     const [orders, setOrders] = useState(orderMock);
       const [showModal, setShowModal] = useState(false);
     
       const openModal = () => {
         setShowModal(true);
       };
     
       const closeModal = () => {
         setShowModal(false);
       };
  return (
    <div className="container mt-4">
     
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
      {orders.map((order) => (
            <tr key={order.id}>
               <td>{order.date}</td>
               <td>{order.client}</td>
               <td className="d-none d-md-table-cell">{order.folio}</td>
               <td className="d-none d-md-table-cell">{order.equipment}</td>
               <td className="d-none d-md-table-cell">{order.model}</td>
               <td className="d-none d-md-table-cell">{order.service}</td>
               <td className="d-none d-md-table-cell">{order.cost_repair}</td>
               <td className="d-none d-md-table-cell">{order.cost_part}</td>
               <td>{order.profit}</td>
               <td className="d-none d-md-table-cell">{order.status}</td>
               <td><button className="btn btn-sm btn-success " onClick={openModal}>Ver</button></td> 
             
            </tr>
          ))}
      </tbody>
    </table>
    <Modal showModal={showModal} handleClose={closeModal}>
 <OrderServiceForm /> 
</Modal>
     
  </div>
  )
}
