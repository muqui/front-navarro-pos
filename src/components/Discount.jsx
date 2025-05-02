import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Discount = () => {
  const [discount, setDiscount] = useState(0);

  return (
    <div className="container mt-4">
      <h4>Tipo de precio</h4>

      <div className="d-flex flex-wrap gap-2 mb-4">
        <button className="btn btn-outline-primary">Precio Mayoreo</button>
        <button className="btn btn-outline-primary">Precio Compra</button>
        <button className="btn btn-outline-primary">Precio Normal</button>
        <button className="btn btn-outline-primary">Porcentaje</button>
      </div>

      <div className="mb-2">
        <label htmlFor="discountRange" className="form-label">Porcentaje de descuento</label>
        <input
          type="range"
          className="form-range"
          id="discountRange"
          min="0"
          max="100"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
        <div><strong>{discount}%</strong></div>
      </div>
    </div>
  );
};
