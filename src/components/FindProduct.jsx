import React, { useState } from "react";
export const FindProduct = () => {

  const productosIniciales = [
    { id: 1, nombre: "Manzana", precio: 1.2 },
    { id: 2, nombre: "Banana", precio: 0.8 },
    { id: 3, nombre: "Naranja", precio: 1.0 },
  ];
  const [busqueda, setBusqueda] = useState("");
  const productosFiltrados = productosIniciales.filter((p) =>
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
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {productosFiltrados.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
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
