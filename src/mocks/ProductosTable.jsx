import React, { useState, useEffect } from 'react';
import { productosMock } from "../mockData/products";
import Modal from '../components/Modal';
import { InventoryForm } from '../components/InventoryForm';

const ProductosTable = () => {
  const [date, setDate] = useState('');
  const [productos, setProductos] = useState(productosMock);
  const [selectProduct, setSelectProduct] = useState(null);
      const [showModal, setShowModal] = useState(false);
    
      const openModal = (producto) => {
        console.log("Producto seleccionado:", producto);
        setSelectProduct(producto);
        setShowModal(true);
      };
    
      const closeModal = () => {
        setShowModal(false);
      };

  useEffect(() => {
    const ahora = new Date();
    setDate(ahora.toLocaleString('es-MX'));
  }, []);
  return (
    <div className="container mt-4">
      <p>Ultimos productos agregados al inventario</p>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th className='d-none d-md-table-cell'>Fecha</th>
            <th className='d-none d-md-table-cell'>Codigo</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th className='d-none d-md-table-cell'>Precio compra</th>
            <th>Total Compra</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.codigo}>
               <td className='d-none d-md-table-cell'>{date}</td>
              <td className='d-none d-md-table-cell'>{producto.codigo}</td>
              <td>{producto.nombre}</td>
              <td>{producto.cantidad}</td>
              <td className='d-none d-md-table-cell' >${producto.precio.toFixed(2)}</td>           
              <td>${(producto.precio * producto.cantidad).toFixed(2)}</td>          
              <td><button className="btn btn-sm btn-success " onClick={() => openModal(producto)} >Ver</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal showModal={showModal} handleClose={closeModal}>
          <InventoryForm   product={selectProduct}/>
        </Modal>

    </div>
  );
};

export default ProductosTable;
