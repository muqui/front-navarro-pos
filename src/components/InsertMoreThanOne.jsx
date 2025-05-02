import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';

export const InsertMoreThanOne = () => {
  const initialValues = {
    barcode: '',
    quantity: '',
  };

  const validationSchema = Yup.object({
    barcode: Yup.string().required('El código de barras es requerido'),
    quantity: Yup.number()
      .typeError('La cantidad debe ser un número')
      .positive('La cantidad debe ser positiva')
      .required('La cantidad es requerida'),
  });

  const handleSubmit = (values) => {
    console.log('Valores enviados:', values);
  };

  const handleCancel = () => {
    console.log('Formulario cancelado');
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Insertar Producto</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ resetForm }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="barcode" className="form-label">Código de Barras</label>
              <Field name="barcode" type="text" className="form-control" />
              <ErrorMessage name="barcode" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">Cantidad</label>
              <Field name="quantity" type="number" className="form-control" />
              <ErrorMessage name="quantity" component="div" className="text-danger" />
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary">Aceptar</button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  resetForm();
                  handleCancel();
                }}
              >
                Cancelar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
