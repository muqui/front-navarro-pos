import React, { useState, useEffect } from 'react';
import { completeMock } from "../mockData/complete";

export const CompleteTable = () => {
      const [complete, setComplete] = useState(completeMock);
  return (
    <div className="container mt-4">
     
    <table className="table table-bordered">
      <thead className="table-dark">
        <tr>
          <th>Nombre</th>
          <th>Ingresos</th>
          <th>Egresos</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
      {complete.map((complete) => (
            <tr key={complete.id}>
               <td>{complete.name}</td>
               <td>{complete.income}</td>
               <td>{complete.expense}</td>
               <td>{complete.total}</td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
  )
}
