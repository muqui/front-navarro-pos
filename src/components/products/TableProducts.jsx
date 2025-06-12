import React, { useEffect, useCallback, useState } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { useAuthStore } from '../../store/auth';
import { API_URLS, buildUrl } from '../../config/apiConfig';
import Modal from '../Modal';
import ProductForm from '../ProductForm';
import { InventoryForm } from '../InventoryForm';

export const TableProducts = ({ searchTerm, page, setPage }) => {
  
  const [activeModal, setActiveModal] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [products, setProducts] = useState([]);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const token = useAuthStore((state) => state.token);

  const openModal = (modalName) => {
    setActiveModal(modalName);
  };

  const handleViewProduct = (product) => {
  
    setSelectedProduct(product);
    openModal('product')
  };

  const handleaddInventory = (product) => {
  
    setSelectedProduct(product);
    openModal('inventory')
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedProduct(null);
  };

  useEffect(() => {
    setLoading(true);
  }, []); // esto es opcional, para mostrar el spinner inicial

  const fetchProducts = async (term) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');

      if (term && term.trim() !== '') {
        const response = await axios.get(
          buildUrl(`${API_URLS.searchProduct}?name=${encodeURIComponent(term)}`),
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        //console.log(response.data);
        setProducts(response.data);
        setTotalPages(1);
      } else {
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
      }
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ debounce + useCallback
  const debouncedFetchProducts = useCallback(
    debounce((term) => {
      fetchProducts(term);
    }, 500),
    [page, limit]
  );

  // ✅ useEffect que llama a la función debounced
  useEffect(() => {
    debouncedFetchProducts(searchTerm);

    return () => {
      debouncedFetchProducts.cancel();
    };
  }, [searchTerm, page, limit]);

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
                    ${parseFloat(product.stock * product.purchasePrice).toFixed(2)}
                  </td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2" onClick={() => handleViewProduct(product)}>Ver</button>
                  </td>
                 
                </tr>
              ))}
            </tbody>
          </table>

          {!searchTerm && (
            <div className="mt-3 d-flex justify-content-between align-items-center">
              <button
                onClick={handlePrevPage}
                className="btn btn-outline-secondary"
                disabled={page === 1}
              >
                Anterior
              </button>
              <span>Página {page} de {totalPages}</span>
              <button
                onClick={handleNextPage}
                className="btn btn-outline-secondary"
                disabled={page === totalPages}
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}

      {activeModal === 'product' && (
        <Modal showModal={true} handleClose={closeModal}>
          <ProductForm  product={selectedProduct}/>
        </Modal>
      )}

{activeModal === 'inventory' && (
        <Modal showModal={true} handleClose={closeModal}>
          <InventoryForm  product={selectedProduct} />
        </Modal>
      )}

    </>
  );
};
