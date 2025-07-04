import React, { useEffect, useCallback, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { buildUrl, API_URLS } from '../config/apiConfig'; 
import { useAuthStore } from '../store/auth';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductForm = ({ product = null, onSuccess }) => {
  const [departments, setDepartments] = useState([]);
  const token = useAuthStore((state) => state.token);
  const isEdit = !!product;
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(buildUrl(API_URLS.categories), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDepartments(response.data);
      } catch (error) {
        console.error('Error al cargar departamentos:', error);
      }
    };

    fetchDepartments();
  }, []);
  useEffect(() => {
    if (product) {
      console.log('Producto recibido para edición:', product);
      // Puedes inicializar el formulario con los datos de `product` aquí
    }
  }, [product]);



  const initialValues = {
    barcode: product?.barcode || '',
  howToSell: product?.howToSell || '',
  categoryId: product?.categoryId || '',
  name: product?.name || '',
  description: product?.description || '',
  purchasePrice: product?.purchasePrice || '',
  gain: product?.gain || '',
  retailPrice: product?.price || '',
  wholesalePrice: product?.wholesalePrice || '',
  useInventory: product?.useInventory || false,
  quantity: product?.stock || '',
  minimum: product?.minimumStock || '',
  packageProducts: product?.packageProducts || [],
  };
  const validationSchema = Yup.object().shape({
    barcode: Yup.string().required('Requerido'),
    howToSell: Yup.string().required('Requerido'),
    categoryId: Yup.number().required('Requerido'),
    name: Yup.string().required('Requerido'),
    description: Yup.string().required('Requerido'),
    purchasePrice: Yup.number().required('Requerido').min(0),
    retailPrice: Yup.number().required('Requerido').min(0),
    wholesalePrice: Yup.number().required('Requerido').min(0),
    quantity: Yup.number().when('useInventory', {
      is: true,
      then: () => Yup.number().required('Requerido si usa inventario').min(0),
      otherwise: () => Yup.number().nullable(),
    }),
    minimum: Yup.number().when('useInventory', {
      is: true,
      then: () => Yup.number().required('Requerido si usa inventario').min(0),
      otherwise: () => Yup.number().nullable(),
    }),
  });

  const handleSubmit = async (values) => {
    try {
      const payload = {
        barcode: values.barcode,
        howToSell: values.howToSell,
        categoryId: values.categoryId,
        name: values.name,
        description: values.description,
        purchasePrice: parseFloat(values.purchasePrice),
        price: parseFloat(values.retailPrice),
        wholesalePrice: parseFloat(values.wholesalePrice),
        stock: parseFloat(values.quantity),
        minimumStock: parseFloat(values.minimum),
        useInventory: values.useInventory,
        packageProducts: values.packageProducts,
        gain: parseFloat(values.gain),
        imgUrl: "https://imagen.com/1",
        stocktaking: true,
        entriy: 1,
        output: 1, 
        supplier: 'Cornejo',
        quantity: 1
      };

      if (isEdit) {
        await axios.patch(
          `${buildUrl(API_URLS.products)}/${values.barcode}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert('Producto actualizado con éxito');
      } else {
        await axios.post(
          buildUrl(API_URLS.products),
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert('Producto creado con éxito');
      }

      if (onSuccess) onSuccess(); // Para cerrar modal o recargar lista
    } catch (error) {
      console.error('Error al guardar producto:', error);
  
      // Mostrar mensajes detallados del backend
      if (error.response && error.response.data && error.response.data.message) {
        const serverMessage = error.response.data.message;
alert(
  'Errores del servidor:\n' +
  (Array.isArray(serverMessage) ? serverMessage.join('\n') : serverMessage)
);
      } else {
        alert('Error al guardar producto');
      }
    }
  };

  return (
    <div className="container mt-4">
      <h4>Registrar Producto</h4>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ values, setFieldValue }) => (
          <Form>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label>Código de Barras</label>
                <Field name="barcode" className="form-control" />
                <ErrorMessage name="barcode" component="div" className="text-danger" />
              </div>

              <div className="col-md-4 mb-3">
                <label>¿Cómo se vende?</label>
                <Field as="select" name="howToSell" className="form-select">
                  <option value="">Seleccione</option>
                  <option value="Unidad">Unidad</option>
                  <option value="Granel">Granel</option>
                  
                </Field>
                <ErrorMessage name="howToSell" component="div" className="text-danger" />
              </div>

              <div className="col-md-4 mb-3">
  <label>Departamento</label>
  <Field
  as="select"
  name="categoryId"
  className="form-select"
  onChange={(e) => setFieldValue('categoryId', Number(e.target.value))}
>
  <option value="">Seleccione</option>
  {departments.map((dept) => (
    <option key={dept.id} value={dept.id}>
      {dept.name}
    </option>
  ))}
</Field>
  <ErrorMessage name="categoryId" component="div" className="text-danger" />
</div>


              <div className="col-md-4 mb-3">
                <label>Nombre</label>
                <Field name="name" className="form-control" />
                <ErrorMessage name="name" component="div" className="text-danger" />
              </div>

              <div className="col-md-8 mb-3">
                <label>Descripción</label>
                <Field name="description" className="form-control" />
                <ErrorMessage name="description" component="div" className="text-danger" />
              </div>

              <div className="col-md-4 mb-3">
                <label>Precio de Compra</label>
                <Field name="purchasePrice" type="number" className="form-control" />
                <ErrorMessage name="purchasePrice" component="div" className="text-danger" />
              </div>

              <div className="col-md-4 mb-3">
                <label>Ganancia (%)</label>
                <Field as="select" name="gain" className="form-select">
                  <option value="">Seleccione</option>
                  {Array.from({ length: 100 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>{n}%</option>
                  ))}
                </Field>
                <ErrorMessage name="gain" component="div" className="text-danger" />
              </div>

              <div className="col-md-4 mb-3">
                <label>Precio Menudeo</label>
                <Field name="retailPrice" type="number" className="form-control" />
                <ErrorMessage name="retailPrice" component="div" className="text-danger" />
              </div>

              <div className="col-md-4 mb-3">
                <label>Precio Mayoreo</label>
                <Field name="wholesalePrice" type="number" className="form-control" />
                <ErrorMessage name="wholesalePrice" component="div" className="text-danger" />
              </div>

            

              <div className="col-12 mb-3">
                <div className="form-check">
                  <Field type="checkbox" name="useInventory" className="form-check-input" id="useInventory" />
                  <label className="form-check-label" htmlFor="useInventory">Usar Inventario</label>
                </div>
              </div>

              {values.useInventory && (
                <>
                  <div className="col-md-6 mb-3">
                    <label>Cantidad</label>
                    <Field name="quantity" type="number" className="form-control" />
                    <ErrorMessage name="quantity" component="div" className="text-danger" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Mínimo</label>
                    <Field name="minimum" type="number" className="form-control" />
                    <ErrorMessage name="minimum" component="div" className="text-danger" />
                  </div>
                </>
              )}

            


              <div className="col-12 text-center mt-4">
                <button type="submit" className="btn btn-success">Guardar Producto</button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProductForm;
