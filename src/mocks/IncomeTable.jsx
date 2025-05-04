import React, { useState, useEffect } from 'react';
import { incomeMock } from "../mockData/income";

export const IncomeTable = () => {
      const [income, setIncome] = useState(incomeMock);
  return (
    <div className="container mt-4">
     
    <table className="table table-bordered">
      <thead className="table-dark">
        <tr>
          <th className="d-none d-md-table-cell" >Fecha</th>
          <th>Descripcion</th>
          <th>Nombre</th>
          <th>Cantidad</th>
        </tr>
      </thead>
      <tbody>
      {income.map((income) => (
            <tr key={income.id}>
               <td className="d-none d-md-table-cell">{income.date}</td>
               <td>{income.description}</td>
               <td>{income.name}</td>
               <td>{income.amount}</td>
             
            </tr>
          ))}
      </tbody>
    </table>
  </div>
  )
}
