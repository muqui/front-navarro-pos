import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductForm = () => {
  const initialValues = {
    barcode: '',
    howToSell: '',
    department: '',
    name: '',
    description: '',
    purchasePrice: '',
    gain: '',
    retailPrice: '',
    wholesalePrice: '',
    useInventory: false,
    quantity: '',
    minimum: '',
    supplier: '',
    packageProducts: [],
  };

  const validationSchema = Yup.object().shape({
    barcode: Yup.string().required('Requerido'),
    howToSell: Yup.string().required('Requerido'),
    department: Yup.string().required('Requerido'),
    name: Yup.string().required('Requerido'),
    description: Yup.string().required('Requerido'),
    purchasePrice: Yup.number().required('Requerido').min(0),
    gain: Yup.number().required('Requerido').min(1).max(100),
    retailPrice: Yup.number().required('Requerido').min(0),
    wholesalePrice: Yup.number().required('Requerido').min(0),
    quantity: Yup.number().when('useInventory', {
      is: true,
      then: Yup.number().required('Requerido si usa inventario').min(0),
    }),
    minimum: Yup.number().when('useInventory', {
      is: true,
      then: Yup.number().required('Requerido si usa inventario').min(0),
    }),
    supplier: Yup.string().required('Requerido'),
  });

  const handleSubmit = (values) => {
    console.log('Datos del formulario:', values);
  };

  return (
    <div className="container mt-4">
      <h4>Registrar Producto</h4>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ values, setFieldValue }) => (
          <Form>
            <div className="mb-3">
              <label>Código de Barras</label>
              <Field name="barcode" className="form-control" />
              <ErrorMessage name="barcode" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label>¿Cómo se vende?</label>
              <Field as="select" name="howToSell" className="form-select">
                <option value="">Seleccione</option>
                <option value="Unidad">Unidad</option>
                <option value="Granel">Granel</option>
                <option value="Paquete">Paquete</option>
              </Field>
              <ErrorMessage name="howToSell" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label>Departamento</label>
              <Field name="department" className="form-control" />
              <ErrorMessage name="department" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label>Nombre</label>
              <Field name="name" className="form-control" />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label>Descripción</label>
              <Field name="description" className="form-control" />
              <ErrorMessage name="description" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label>Precio de Compra</label>
              <Field name="purchasePrice" type="number" className="form-control" />
              <ErrorMessage name="purchasePrice" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label>Ganancia (%)</label>
              <Field as="select" name="gain" className="form-select">
                <option value="">Seleccione</option>
                {Array.from({ length: 100 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>{n}%</option>
                ))}
              </Field>
              <ErrorMessage name="gain" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label>Precio Menudeo</label>
              <Field name="retailPrice" type="number" className="form-control" />
              <ErrorMessage name="retailPrice" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label>Precio Mayoreo</label>
              <Field name="wholesalePrice" type="number" className="form-control" />
              <ErrorMessage name="wholesalePrice" component="div" className="text-danger" />
            </div>

            <div className="form-check mb-3">
              <Field type="checkbox" name="useInventory" className="form-check-input" id="useInventory" />
              <label className="form-check-label" htmlFor="useInventory">Usar Inventario</label>
            </div>

            {values.useInventory && (
              <>
                <div className="mb-3">
                  <label>Cantidad</label>
                  <Field name="quantity" type="number" className="form-control" />
                  <ErrorMessage name="quantity" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                  <label>Mínimo</label>
                  <Field name="minimum" type="number" className="form-control" />
                  <ErrorMessage name="minimum" component="div" className="text-danger" />
                </div>
              </>
            )}

            <div className="mb-3">
              <label>Proveedor</label>
              <Field name="supplier" className="form-control" />
              <ErrorMessage name="supplier" component="div" className="text-danger" />
            </div>

            <h5 className="mt-4">Productos del Paquete</h5>
            <button
              type="button"
              className="btn btn-outline-primary mb-3"
              onClick={() =>
                setFieldValue('packageProducts', [
                  ...values.packageProducts,
                  { name: 'Producto Ejemplo', quantity: 1 },
                ])
              }
            >
              Añadir producto
            </button>

            
              <table className="table table-sm table-bordered">
                <thead>
                  <tr>
                    <th>Cantidad</th>
                    <th>Nombre</th>
                  </tr>
                </thead>
                <tbody>
                <td>1</td>
                <td>Coca</td>
                </tbody>
              </table>
        

            <button type="submit" className="btn btn-success mt-3">Guardar</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProductForm;
