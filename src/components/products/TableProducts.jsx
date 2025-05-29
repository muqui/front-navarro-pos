// src/components/TableProducts.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../store/auth';
import { API_URLS, buildUrl } from '../../config/apiConfig';

export const TableProducts = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // puedes cambiar este valor si quieres más productos por página
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get(
          buildUrl(API_URLS.products) + `?page=${page}&limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProducts(response.data.data);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, limit]);

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <>
      <h2 className="my-3">Listado de Productos</h2>

      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <>
          <table className="table table-striped table-hover mb-0">
            <thead>
              <tr>
                <th className="d-none d-md-table-cell">Código</th>
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
                  <td className="d-none d-md-table-cell">
                    ${parseFloat(product.purchasePrice).toFixed(2)}
                  </td>
                  <td className="d-none d-md-table-cell">{product.entriy}</td>
                  <td className="d-none d-md-table-cell">{product.output}</td>
                  <td className="d-none d-md-table-cell">{product.stock}</td>
                  <td className="d-none d-md-table-cell">
                    ${parseFloat(product.total).toFixed(2)}
                  </td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2">Ver</button>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-secondary me-2">Agregar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginación */}
          <div className="mt-3 d-flex justify-content-between align-items-center">
            <button
              onClick={handlePrevPage}
              className="btn btn-outline-secondary"
              disabled={page === 1}
            >
              Anterior
            </button>
            <span>
              Página {page} de {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              className="btn btn-outline-secondary"
              disabled={page === totalPages}
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </>
  );
};
