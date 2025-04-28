import React, { useState, useEffect } from 'react';
import Menu from '../components/Menu'
import { UsersTable } from '../mocks/UsersTable'
import Modal from '../components/Modal'; 
import {UserForm} from '../components/UserForm';

export const Config = () => {

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <Menu />
      <div className="container mt-4">


        {/* Nav tabs */}
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home"
              type="button"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              Usuarios
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              Impresion
            </button>
          </li>

        </ul>

        {/* Tab panes */}
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <div className=" p-3">

              <button className="btn btn-outline-secondary me-2" onClick={openModal} >Registrar Usuario</button>


            </div>
            <div className="p-1">
              <UsersTable />
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div className="p-3">
              <div className="form-group">
                <label>Seleccione el tamaño de la hoja:</label>
                <div className="d-flex">
                  <div className="form-check me-3">
                    <input type="radio" className="form-check-input" id="58mm" name="tamano" value="58mm" />
                    <label className="form-check-label" htmlFor="58mm">58mm</label>
                  </div>
                  <div className="form-check me-3">
                    <input type="radio" className="form-check-input" id="80mm" name="tamano" value="80mm" />
                    <label className="form-check-label" htmlFor="80mm">80mm</label>
                  </div>
                  <div className="form-check">
                    <input type="radio" className="form-check-input" id="carta" name="tamano" value="carta" />
                    <label className="form-check-label" htmlFor="carta">Tamaño carta</label>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
        <Modal showModal={showModal} handleClose={closeModal}>
          <UserForm />
        </Modal>
      </div>


    </>

  )
}
