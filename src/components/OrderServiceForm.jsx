import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const OrderServiceForm = ({ order }) => {
  const formik = useFormik({
    initialValues: {
      service: order?.service || '',
      client: order?.client || '',
      cellphone: order?.cellphone || '',
      repairCost: order?.repairCost || '',
      paid: order?.paid || '',
      left: order?.left || '',
      note: order?.note || '',
      email: order?.email || '',
      brand: order?.brand || '',
      model: order?.model || '',
      issue: order?.issue || '',
      receivedCondition: order?.receivedCondition || '',
      passwordCellPhone: order?.passwordCellPhone || '',
      imei: order?.imei || '',
      date: order?.date ? new Date(order.date).toISOString().slice(0, 16) : '',
      status: order?.status || 'Pendiente',
    },
    enableReinitialize: true, // 👈 importante para recargar los datos cuando cambia `order`
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
    onSubmit: (values) => {
      if (order) {
        // Aquí puedes hacer PUT o PATCH para editar
        console.log('Editando orden existente:', values);
      } else {
        // Aquí puedes hacer POST para crear nueva
        console.log('Creando nueva orden:', values);
      }
    },
  });

  const fields = [
    ['service', 'Servicio'],
    ['client', 'Cliente'],
    ['cellphone', 'Celular'],
    ['repairCost', 'Costo Reparacion'],
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
      <h4 className="mb-4 text-center">
        {order ? 'Editar Orden de Servicio' : 'Crear Orden de Servicio'}
      </h4>
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          {fields.map(([field, label]) => (
            <div className="col-md-3 mb-3" key={field}>
              <label htmlFor={field} className="form-label">{label}</label>
              <input
                type={field.includes('Cost') || field === 'paid' || field === 'left' ? 'number' : 'text'}
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
    onBlur={formik.handleBlur}
    className="form-select"
  >
    <option value="Pendiente">Pendiente</option>
    <option value="En revision">En revisión</option>
    <option value="En reparacion">En reparación</option>
    <option value="Reparado">Reparado</option>
    <option value="Entregado">Entregado</option>
    <option value="Cancelado">Cancelado</option>
    <option value="Finalizado">Finalizado</option>
  </select>
  {formik.touched.status && formik.errors.status && (
    <div className="text-danger">{formik.errors.status}</div>
  )}
</div>

<div class="row my-3">
  <div class="col-3">
    <button
      class="btn btn-secondary w-100"
      data-bs-toggle="offcanvas"
      data-bs-target="#buscarRefaccion"
    >
      Buscar refacción
    </button>
  </div>
</div>

<div class="container mt-4">
  <h5>Lista de Refacciones</h5>
  <table class="table table-bordered table-hover">
    <thead class="table-light">
      <tr>
        <th>#</th>
        <th>Nombre</th>
        <th>Categoría</th>
        <th>Precio</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Refacción A</td>
        <td>Eléctrica</td>
        <td>$120.00</td>
        <td>
          <button class="btn btn-sm btn-primary">Eliminar</button>
        </td>
      </tr>
     
    </tbody>
  </table>
</div>

        </div>

        <button type="submit" className="btn btn-primary mt-3">
          {order ? 'Actualizar' : 'Crear'}
        </button>
      </form>
    

<div className="offcanvas offcanvas-end" tabIndex="-1" id="buscarRefaccion">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title">Buscar refacción</h5>
    <button className="btn-close" data-bs-dismiss="offcanvas"></button>
  </div>
  <div className="offcanvas-body">
    {/* Aquí colocas un input + tabla/lista de refacciones */}
  </div>
</div>
    </div>
  );
};
