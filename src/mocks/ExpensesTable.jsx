import React, { useState, useEffect } from 'react';
import { expensesMock } from "../mockData/expenses";

export const ExpensesTable = () => {
      const [expenses, setExpenses] = useState(expensesMock);
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
      {expenses.map((expense) => (
            <tr key={expense.id}>
               <td className="d-none d-md-table-cell">{expense.date}</td>
               <td>{expense.description}</td>
               <td>{expense.name}</td>
               <td>{expense.amount}</td>
             
            </tr>
          ))}
      </tbody>
    </table>
  </div>
  )
}
