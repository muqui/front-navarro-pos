import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useAuthStore } from '../store/auth';
import { buildUrl, API_URLS } from '../config/apiConfig';
import { FindProduct } from './FindProduct';

export const OrderServiceForm = ({ folio, onSuccess }) => {
  console.log(`Folio = ${folio}`)
  const { token } = useAuthStore();
  const [order, setOrder] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  
  const handleAddProduct = (product) => {
   // console.log(product)
    setSelectedProducts((prev) => [...prev, product]);
  };
   
  const fetchOrder = async () => {
    try {
      const { data } = await axios.get(buildUrl(`${API_URLS.repairCellphones}/${folio}`), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrder(data);
    } catch (error) {
      console.error('Error al cargar la orden:', error);
      alert('No se pudo cargar la orden');
    }
  };

  /*useEffect(() => {
    console.log(order.folio)
  
    if (order?.spareParts) {
      console.log(order.spareParts)
      setSelectedProducts(order.spareParts.map(p => ({
        id: p.product_id,
        barcode: p.barcode,
        name: p.name,
        price: p.price,
       
      })));
    }
  }, [order]);
*/
useEffect(() => {
  if (folio) {
    fetchOrder();
  }
}, [folio]);

useEffect(() => {
  if (order?.spareParts) {
    setSelectedProducts(order.spareParts.map(p => ({
      id: p.product.id,
      barcode: p.product.barcode,
      name: p.product.name,
      price: p.price,
    })));
  }
  console.log(order)
}, [order]);

  const formik = useFormik({
    initialValues: {
      service: order?.service || '',
      client: order?.client || '',
      cellphone: order?.cellphone || '',
      repairCost: order?.repair_cost || '',
      paid: order?.paid || '',
      left: order?.left || '',
      note: order?.note || '',
      email: order?.email || '',
      brand: order?.brand || '',
      model: order?.model || '',
      issue: order?.issue || '',
      receivedCondition: order?.received_condition || '',
      passwordCellPhone: order?.password_cell_phone || '',
      imei: order?.imei || '',
      date: order?.date ? new Date(order.date).toISOString().slice(0, 16) : '',
      status: order?.status || 'Pendiente',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      service: Yup.string().required('Required'),
      client: Yup.string().required('Required'),
      cellphone: Yup.string().required('Required'),
      repairCost: Yup.number().required('Required').positive(),
      paid: Yup.number().required('Required').min(0),
      left: Yup.number().required('Required').min(0),
      email: Yup.string().email('Invalid email format'),
      brand: Yup.string().required('Required'),
      model: Yup.string().required('Required'),
      issue: Yup.string().required('Required'),
      status: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      const payload = {
        ...values,
        repair_cost: Number(values.repairCost),
        paid: Number(values.paid),
        left: Number(values.left),
        received_condition: values.receivedCondition,
        password_cell_phone: values.passwordCellPhone,
        spareParts: selectedProducts.map(part => ({
          productId: part.id,
          price: Number(part.price),
          purchasePrice: Number(part.purchasePrice)
        }))
    
      };

      try {
        if (order) {
          console.log('Payload enviado:', payload);
          await axios.patch(buildUrl(`${API_URLS.repairCellphonesSpareParts}/${order.folio}`), payload, {
            headers: { Authorization: `Bearer ${token}` },
          });
          alert('Orden actualizada correctamente');
         
        } else {
          await axios.post(buildUrl(API_URLS.repairCellphones), payload, {
            headers: { Authorization: `Bearer ${token}` },
          });
          alert('Orden creada correctamente');
          formik.resetForm();
          setSelectedProducts([]);
        }
        if (onSuccess) onSuccess();
      } catch (error) {
        console.error(error);
        alert('Error al procesar la orden axios');
      }
    },
  });

  const fields = [
    ['service', 'Servicio'],
    ['client', 'Cliente'],
    ['cellphone', 'Celular'],
    ['repairCost', 'Costo Reparación'],
    ['paid', 'Abono'],
    ['left', 'Resto'],
    ['note', 'Nota'],
    ['email', 'Correo'],
    ['brand', 'Marca'],
    ['model', 'Modelo'],
    ['issue', 'Falla'],
    ['receivedCondition', 'Condición'],
    ['passwordCellPhone', 'Contraseña'],
    ['imei', 'IMEI'],
  ];

  return (
    <div className="container my-1">
      <h4 className="mb-4 text-center">{order ? 'Editar Orden de Servicio' : 'Crear Orden de Servicio'}</h4>

 

      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          {fields.map(([field, label]) => (
            <div className="col-md-3 mb-3" key={field}>
              <label htmlFor={field} className="form-label">{label}</label>
              <input
                type={(field.includes('Cost') || field === 'paid' || field === 'left') ? 'number' : 'text'}
                id={field}
                name={field}
                value={formik.values[field]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-control"
              />
              {formik.touched[field] && formik.errors[field] && (
                <div className="text-danger">{formik.errors[field]}</div>
              )}
            </div>
          ))}

          <div className="col-md-3 mb-3">
            <label htmlFor="status" className="form-label">Estado</label>
            <select
              id="status"
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              className="form-control"
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Reparado">Reparado</option>
              <option value="Entregado">Entregado</option>
            </select>
            {formik.touched.status && formik.errors.status && (
              <div className="text-danger">{formik.errors.status}</div>
            )}
          </div>
          <div className="row my-3">

             {/* Botón y tabla solo se muestran si hay un 'folio' */}
          {order && (
            <> <div class="col-3">
            <button
               type="button"
              class="btn btn-secondary w-100"
              data-bs-toggle="offcanvas"
              data-bs-target="#buscarRefaccion"
            >
              Buscar refacción
            </button>
          </div>
          <div class="container mt-4">
  <h5>Lista de Refacciones</h5>
  <table class="table table-bordered table-hover">
    <thead class="table-light">
      <tr>
        <th>Codigo</th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
  {selectedProducts.map((product, index) => (
    <tr key={product.id || index}>
      <td>{product.barcode}</td>
      <td>{product.name}</td>
      <td>{product.price}</td>
  
      <td>
        <button
          className="btn btn-sm btn-danger"
          onClick={() =>
            setSelectedProducts((prev) =>
              prev.filter((_, i) => i !== index)
            )
          }
        >
          Eliminar
        </button>
      </td>
    </tr>
  ))}
</tbody>
  </table>
</div></>
          )}  
 
</div>


        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            {order ? 'Actualizar' : 'Registrar'}
          </button>
        </div>
      </form>

      <div className="offcanvas offcanvas-end" tabIndex="-1" id="buscarRefaccion">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title">Buscar refacción</h5>
    <button className="btn-close" data-bs-dismiss="offcanvas"></button>
  </div>
  <div className="offcanvas-body">
    {/* Aquí colocas un input + tabla/lista de refacciones */}
   <FindProduct onSelectProduct={handleAddProduct} />
  </div>
</div>

    </div>
  );
};
