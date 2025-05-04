import React, { useState } from 'react'
import { usersMock } from "../mockData/Users";
import Modal from '../components/Modal'; 
import {UserForm} from '../components/UserForm';
export const UsersTable = () => {
  const [users, setUsers] = useState(usersMock);
   const [showModal, setShowModal] = useState(false);
  
    const openModal = () => {
      setShowModal(true);
    };
  
    const closeModal = () => {
      setShowModal(false);
    };
  return (
    <div className='container mt-4'>
        <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th className='d-none d-md-table-cell'>Nombre</th>
            <th>Correo</th>
            <th className='d-none d-md-table-cell'>Nivel</th>
            <th></th>
           
          </tr>
        </thead>
        <tbody>   
        {users.map((user) => (
            <tr key={user.id}>
              
              <td className='d-none d-md-table-cell'>{user.name}</td>
              <td>{user.email}</td>
              <td className='d-none d-md-table-cell'>{user.rol}</td>
                
                   
              <td><button className="btn btn-sm btn-success " onClick={openModal} >Ver</button></td>
            </tr>
          ))}    
        </tbody>
      </table>
      <Modal showModal={showModal} handleClose={closeModal}>
          <UserForm />
        </Modal>
    </div>
  )
}
