import React, { useState, useEffect } from 'react';
import { SelectIncomeNames } from '../SelectIncomeNames'
import { buildUrl, API_URLS } from '../../config/apiConfig';
import { useAuthStore } from '../../store/auth';
import axios from 'axios';
export const IncomeTable = () => {
    const formatDate = (date) => date.toISOString().split('T')[0];
    const today = new Date();
    const [startDate, setStartDate] = useState(formatDate(today));
      const [endDate, setEndDate] = useState(formatDate(today));
      const [incomes, setIncomes] = useState([]);
      const [total, setTotal] = useState('');
     const [selectedName, setSelectedName] = useState('');
     const token = useAuthStore((state) => state.token);
     useEffect(() => {
        const fetchData = async () => {
      
          const params = new URLSearchParams();
        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);
        if (selectedName) params.append('name', selectedName);
      
          const url =buildUrl(`${API_URLS.incomes}?${params.toString()}`)
          console.log(url)
          try {
            const response = await axios.get(url, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }); // Axios reemplaza fetch aquí
            const data = response.data;
           
            // Asignamos orderDetails directamente a productos
            setIncomes(data.incomes);
            console.log(data)
            setTotal(data.totalAmount)
          } catch (error) {
            console.error('Error al obtener los datos con Axios:', error);
          }
        };
    
        fetchData();
      }, [startDate, endDate, selectedName]);
  return (
    <div className="container mt-0">
      
         <div className="row mb-3">
           <div className="col-md-3">
             <label>Fecha de inicio:</label>
             <input type="date" className="form-control" value={startDate} onChange={e => setStartDate(e.target.value)}/>
           </div>
           <div className="col-md-3">
             <label>Fecha final:</label>
             <input type="date" className="form-control"  value={endDate} onChange={e => setEndDate(e.target.value)} />
           </div>
           <div className="col-md-3">
             <label>Categoria:</label>
             
             <SelectIncomeNames onIncomeName ={setSelectedName} />
            
           </div>
         
         </div>
   
         <table className="table table-bordered">
           <thead className="table-dark">
             <tr>
               <th className="d-none d-md-table-cell">Fecha</th>
               <th className="d-none d-md-table-cell">Descripcion</th>
               <th className="d-none d-md-table-cell">Nombre</th>
               <th>cantida</th>
             
             </tr>
           </thead>
           <tbody>
          {incomes.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">No hay productos que coincidan con los filtros.</td>
            </tr>
          ) : (
            incomes.map((income) => (
              <tr key={income.id}>
                <td className="d-none d-md-table-cell">{income.date}</td>
                <td className="d-none d-md-table-cell">{income.description}</td>
                <td className="d-none d-md-table-cell">{income.incomeNames.name}</td>
                <td>{income.amount}</td>
              
              </tr>
            ))
          )}
        </tbody>
         </table>
         <div className="fixed-bottom bg-light border-top shadow-lg p-3">
           <div className="container py-2">
             <div className="row align-items-center justify-content-between g-2">
               {/* Totales */}
               <div className="col-12   small text-end">
               <span className="fw-bold">Total: ${total}</span>
   
               </div>
             </div>
           </div>
   
         </div>
       </div>
  )
}
