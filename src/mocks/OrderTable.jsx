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
          <th>Folio</th>
          <th>Equipo</th>
          <th>Modelo</th>
          <th>Servicio</th>
          <th>$ reparacion</th>
          <th>$ refacciones</th>
          <th>Ganancia</th>
          <th>Estado</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      {orders.map((order) => (
            <tr key={order.id}>
               <td>{order.date}</td>
               <td>{order.client}</td>
               <td>{order.folio}</td>
               <td>{order.equipment}</td>
               <td>{order.model}</td>
               <td>{order.service}</td>
               <td>{order.cost_repair}</td>
               <td>{order.cost_part}</td>
               <td>{order.profit}</td>
               <td>{order.status}</td>
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
