import React, { useState } from "react";
import { productosMock } from "../mockData/products";
export const FindProduct = () => {

  const [productos, setProductos] = useState(productosMock);
  const [busqueda, setBusqueda] = useState("");
  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
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

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
          
            <th>Nombre</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {productosFiltrados.map((p) => (
            <tr key={p.id}>
            
              <td>{p.nombre}</td>
              <td>${p.precio.toFixed(2)}</td>
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
    </div>
  )
}
