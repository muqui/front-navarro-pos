import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
export const InventoryForm = ({ product }) => {
  useEffect(() => {
    if (product) {
      console.log("Formulario cargado con producto:", product);
    }
  }, [product]);

    const initialValues = {
        barcode: product?.codigo || "",
        name:   product?.nombre || "",
        costPrice:  product?.compra ||  "",
        gain: "1",
        salePrice:  product?.precio  || "",
        wholesalePrice: product?.compra  ||  "",
        supplier: "",
      };
    
      const validationSchema = Yup.object({
        barcode: Yup.string().required("Campo requerido"),
        name: Yup.string().required("Campo requerido"),
        costPrice: Yup.number().typeError("Debe ser un número").required("Campo requerido"),
        gain: Yup.string().required("Campo requerido"),
        salePrice: Yup.number().typeError("Debe ser un número").required("Campo requerido"),
        wholesalePrice: Yup.number().typeError("Debe ser un número").required("Campo requerido"),
        supplier: Yup.string().required("Campo requerido"),
      });
    
      const onSubmit = (values) => {
        console.log("Datos del formulario:", values);
      };
  return (
    <div className="container mt-4">
    <h4>Ingresa producto</h4>
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
  <Form>
    <div className="row">
      <div className="mb-3 col-md-4">
        <label className="form-label">Código de Barras</label>
        <Field name="barcode" className="form-control" />
        <ErrorMessage name="barcode" component="div" className="text-danger" />
      </div>

      <div className="mb-3 col-md-4">
        <label className="form-label">Nombre</label>
        <Field name="name" className="form-control" />
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
    </div>

    <button type="submit" className="btn btn-primary" >Agregar</button>
  </Form>
</Formik>

  </div>
  )
}
