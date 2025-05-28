import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useAuthStore } from '../store/auth';
import { buildUrl, API_URLS } from '../config/apiConfig';

export const InventoryForm = ({ product }) => {
  const token = useAuthStore((state) => state.token);
  useEffect(() => {
    if (product) {
      console.log("Formulario cargado con producto:", product);
    }
  }, [product]);

  const initialValues = {
    barcode: product?.codigo || "",
    name: product?.nombre || "",
    costPrice: product?.compra || "",
    gain: "1",
    salePrice: product?.precio || "",
    wholesalePrice: product?.compra || "",
    supplier: "",
    quantity: "", // nuevo campo
  };

  const validationSchema = Yup.object({
    barcode: Yup.string().required("Campo requerido"),
    name: Yup.string().required("Campo requerido"),
    costPrice: Yup.number().typeError("Debe ser un número").required("Campo requerido"),
    gain: Yup.string().required("Campo requerido"),
    salePrice: Yup.number().typeError("Debe ser un número").required("Campo requerido"),
    wholesalePrice: Yup.number().typeError("Debe ser un número").required("Campo requerido"),
    supplier: Yup.string().required("Campo requerido"),
    quantity: Yup.number().typeError("Debe ser un número").required("Campo requerido"),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      const url = buildUrl(`${API_URLS.addInventory}/${values.barcode}`);
      const payload = {
        quantity: Number(values.quantity),
        supplier: values.supplier,
        costPrice: Number(values.costPrice),
        salePrice: Number(values.salePrice),
        wholesalePrice: Number(values.wholesalePrice),
      };

      const response = await axios.patch(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Inventario actualizado:", response.data);
      alert("Inventario actualizado correctamente");
      resetForm();
    } catch (error) {
      console.error("Error al actualizar el inventario:", error);
      alert("Error al actualizar el inventario");
    }
  };

  return (
    <div className="container mt-4">
      <h4>Ingresa producto</h4>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <div className="row">
            <div className="mb-3 col-md-4">
              <label className="form-label">Código de Barras</label>
              <Field name="barcode" className="form-control"  />
              <ErrorMessage name="barcode" component="div" className="text-danger" />
            </div>

            <div className="mb-3 col-md-4">
              <label className="form-label">Nombre</label>
              <Field name="name" className="form-control"  />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>

            <div className="mb-3 col-md-4">
              <label className="form-label">Precio Costo</label>
              <Field name="costPrice" className="form-control" />
              <ErrorMessage name="costPrice" component="div" className="text-danger" />
            </div>

            <div className="mb-3 col-md-4">
              <label className="form-label">Ganancia</label>
              <Field as="select" name="gain" className="form-select">
                {[...Array(100)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="gain" component="div" className="text-danger" />
            </div>

            <div className="mb-3 col-md-4">
              <label className="form-label">Precio Venta</label>
              <Field name="salePrice" className="form-control" />
              <ErrorMessage name="salePrice" component="div" className="text-danger" />
            </div>

            <div className="mb-3 col-md-4">
              <label className="form-label">Precio Mayoreo</label>
              <Field name="wholesalePrice" className="form-control" />
              <ErrorMessage name="wholesalePrice" component="div" className="text-danger" />
            </div>

            <div className="mb-3 col-md-4">
              <label className="form-label">Proveedor</label>
              <Field name="supplier" className="form-control" />
              <ErrorMessage name="supplier" component="div" className="text-danger" />
            </div>

            <div className="mb-3 col-md-4">
              <label className="form-label">Cantidad a ingresar</label>
              <Field name="quantity" className="form-control" />
              <ErrorMessage name="quantity" component="div" className="text-danger" />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">Agregar</button>
        </Form>
      </Formik>
    </div>
  );
};
