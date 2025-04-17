import React, { useState } from 'react'
import { usersMock } from "../mockData/Users";
export const UsersTable = () => {
  const [users, setUsers] = useState(usersMock);
  return (
    <div className='container mt-4'>
        <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Nivel</th>
            <th></th>
           
          </tr>
        </thead>
        <tbody>   
        {users.map((user) => (
            <tr key={user.id}>
              
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.rol}</td>
                
                   
              <td><button className="btn btn-sm btn-success " onClick>Ver</button></td>
            </tr>
          ))}    
        </tbody>
      </table>

    </div>
  )
}
