import { useEffect, useState } from 'react';
import axios from 'axios';
//import { buildUrl, API_URLS } from '../config/apiConfig';
import { buildUrl, API_URLS } from '../../config/apiConfig';
import Modal from '../Modal'; 
import {UserForm} from '../UserForm';
import { useAuthStore } from '../../store/auth'; 
export const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const token = useAuthStore((state) => state.token);
   const [showModal, setShowModal] = useState(false);
  
    const openModal = () => {
      setShowModal(true);
    };
  
    const closeModal = () => {
      setShowModal(false);
    };
    useEffect(() => {
      const fetchUsers = async () => {
          try {
              const response = await axios.get(buildUrl(`${API_URLS.users}`), {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              });
              // Solo usuarios activos
              const activeUsers = response.data.filter(user => user.isActive === true);
              setUsers(activeUsers);
          } catch (error) {
              console.error('Error al obtener los usuarios:', error);
          }
      };

      fetchUsers();
  }, [token]);

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
              <td className='d-none d-md-table-cell'>{user.isAdmin}</td>
                
                   
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
