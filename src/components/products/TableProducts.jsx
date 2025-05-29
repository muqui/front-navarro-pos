// src/components/TableProducts.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../store/auth';
import { API_URLS, buildUrl } from '../../config/apiConfig';

export const TableProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = useAuthStore((state) => state.token);
    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const token = localStorage.getItem('token'); // Asegúrate de que el token esté guardado correctamente
    
            const response = await axios.get(buildUrl(API_URLS.products), {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            console.log(response.data)
    
            setProducts(response.data);
          } catch (error) {
            console.error('Error al obtener los productos:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchProducts();
      }, []);
  return (
    <table className="table table-striped table-hover mb-0">
    <thead>
      <tr>
        <th className="d-none d-md-table-cell">Codigo</th>
        <th className="d-none d-md-table-cell">Nombre</th>
        <th className="d-none d-md-table-cell">Precio costo</th>
        <th className="d-none d-md-table-cell">Entradas</th>
        <th className="d-none d-md-table-cell">Salidas</th>
        <th className="d-none d-md-table-cell">Saldo</th>
        <th className="d-none d-md-table-cell">Total</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
    {products.map((product) => (
          <tr key={product.id}>
            <td className="d-none d-md-table-cell">{product.barcode}</td>
            <td className="d-none d-md-table-cell">{product.name}</td>
            <td className="d-none d-md-table-cell">${parseFloat(product.purchasePrice).toFixed(2)}</td>
            <td className="d-none d-md-table-cell">{product.entriy}</td>
            <td className="d-none d-md-table-cell">{product.output}</td>
            <td className="d-none d-md-table-cell">{product.stock}</td>
            <td className="d-none d-md-table-cell">${parseFloat(product.total).toFixed(2)}</td>
            <td>  <button className="btn btn-sm btn-primary me-2">Ver</button></td>
            <td>  <button className="btn btn-sm btn-secondary me-2">Agregar</button></td>
          </tr>
        ))}   
    </tbody>
  </table>
  )
}
