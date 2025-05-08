import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "../store/auth";

export const FindProduct = ({ onSelectProduct, onClose }) => {
  const { token } = useAuthStore();
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const buscarProductos = async () => {
      if (!busqueda.trim() || !token) return;

      setLoading(true);
      try {
        const response = await axios.get(
          `https://back-navarro-pos.duckdns.org/products/search`,
          {
            params: { name: busqueda },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProductos(response.data);
      } catch (error) {
        console.error("Error al buscar productos:", error);
        setProductos([]);
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(buscarProductos, 500);
    return () => clearTimeout(delay);
  }, [busqueda, token]);

  const handleSelect = (product) => {
    onSelectProduct(product);
    onClose();
  };

  const productosFiltrados = productos.filter((p) =>
    p.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center mb-3">
        <h5 className="me-3 mb-0">Buscar</h5>
        <input
          type="text"
          className="form-control"
          placeholder="Escribe para buscar..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ maxWidth: "300px" }}
        />
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Seleccionar</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>${parseFloat(p.price).toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handleSelect(p)}
                    data-bs-dismiss="offcanvas"
                  >
                    Seleccionar
                  </button>
                </td>
              </tr>
            ))}
            {productosFiltrados.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center">
                  No se encontraron resultados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};
