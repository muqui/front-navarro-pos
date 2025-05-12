import React, { useState } from 'react';
import Menu from '../components/Menu'
import { OrderTable } from '../components/repair/OrderTable';
import Modal from '../components/Modal';
import { OrderServiceForm } from '../components/OrderServiceForm';
// Función para obtener la fecha formateada como yyyy-mm-dd

export const Repair = () => {
  const formatDate = (date) => date.toISOString().split('T')[0];
  // Obtener la fecha actual y la de hace 7 días
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  const [showModal, setShowModal] = useState(false);
  const [reloadOrders, setReloadOrders] = useState(false);
  const [startDate, setStartDate] = useState(formatDate(sevenDaysAgo));
  const [endDate, setEndDate] = useState(formatDate(today));
  const [status, setStatus] = useState('');
  const triggerReload = () => {
    setReloadOrders(prev => !prev); // cambia el valor para forzar recarga
  };
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    console.log('cerrar');
    setShowModal(false);
  };

  return (
    <>
      <Menu />

      <div className="container mt-4">
        {/* Línea 2: Botones debajo del input */}
        <div className="row align-items-end mb-3 g-2">
          <div className="col-auto">
            <button className="btn btn-outline-secondary" onClick={openModal}>
              Registrar orden
            </button>
          </div>

          <div className="col-auto">
            <label className="form-label">Desde:</label>
            <input
              type="date"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="col-auto">
            <label className="form-label">Hasta:</label>
            <input
              type="date"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div className="col-auto">
            <label className="form-label">Estado:</label>
            <select
              className="form-control"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="Pendiente">Pendiente</option>
              <option value="En revision">En revisión</option>
              <option value="En reparacion">En reparación</option>
              <option value="Reparado">Reparado</option>
              <option value="Entregado">Entregado</option>
              <option value="Cancelado">Cancelado</option>
              <option value="Finalizada">Finalizada</option>
            </select>
          </div>

         
        </div>

        <OrderTable
          reload={reloadOrders}
          triggerReload={triggerReload}
          startDate={startDate}
          endDate={endDate}
          status={status}
        />
      </div>

      <Modal showModal={showModal} handleClose={closeModal}>
        <OrderServiceForm onSuccess={() => {
          triggerReload();
          closeModal();
        }} />
      </Modal>

    </>
  )
}
