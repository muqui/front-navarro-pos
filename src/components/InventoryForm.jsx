import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useAuthStore } from '../store/auth';
import { buildUrl, API_URLS } from '../config/apiConfig';
import debounce from 'lodash.debounce';

export const InventoryForm = ({ product }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(product || null);
  const token = useAuthStore((state) => state.token);
  const formikRef = useRef(null);

  useEffect(() => {
    if (product) {
      console.log("Formulario cargado con producto:", product);
    }
  }, [product]);

  const fetchSuggestions = debounce(async (term) => {
    if (!term) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `${buildUrl(API_URLS.searchProduct)}?name=${term}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
     
      setSuggestions(response.data || []);
    } catch (error) {
      console.error("Error al buscar productos:", error);
    }
  }, 300);

  useEffect(() => {
    fetchSuggestions(searchTerm);
  }, [searchTerm]);

  const handleProductSelect = (product) => {
    console.log(product)
    setSelectedProduct(product);
    setSearchTerm(product.name);
    setSuggestions([]);

    if (formikRef.current) {
      formikRef.current.setFieldValue('barcode', product.barcode || '');
      formikRef.current.setFieldValue('name', product.name || '');
      formikRef.current.setFieldValue('costPrice', product.purchasePrice || '');
      formikRef.current.setFieldValue('salePrice', product.price || '');
      formikRef.current.setFieldValue('wholesalePrice', product.wholesalePrice || '');
    }
  };

  const initialValues = {
    barcode: product?.barcode || "",
    name: product?.name || "",
    costPrice: product?.purchasePrice || "",
    gain: "1",
    salePrice: product?.price || "",
    wholesalePrice: product?.wholesalePrice || "",
    supplier: "",
    quantity: "",
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
       // quantity: Number(values.quantity),
        supplier: values.supplier,
        purchasePrice: Number(values.costPrice),
        price: Number(values.salePrice),
        wholesalePrice: Number(values.wholesalePrice),
        entriy:  Number(values.quantity),
      };

      const response = await axios.patch(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Inventario actualizado:", response.data);
      alert("Inventario actualizado correctamente");
      resetForm();
      setSelectedProduct(null);
      setSearchTerm('');
    } catch (error) {
      console.error("Error al actualizar el inventario:", error);
      alert("Error al actualizar el inventario");
    }
  };

  return (
    <div className="container mt-4">
      <h4>Ingresa producto</h4>

      {/* Campo de búsqueda fuera del formulario */}
      <div className="mb-3 col-md-4 position-relative">
        <label className="form-label">Buscar producto por nombre</label>
        <input
          type="text"
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {suggestions.length > 0 && (
          <ul className="list-group position-absolute w-100 zindex-tooltip">
            {suggestions.map((sug) => (
              <li
                key={sug.id}
                className="list-group-item list-group-item-action"
                onClick={() => handleProductSelect(sug)}
                style={{ cursor: "pointer" }}
              >
                {sug.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Formulario */}
      <Formik
        innerRef={formikRef}
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="row">
            <div className="mb-3 col-md-4">
              <label className="form-label">Código de Barras</label>
              <Field name="barcode" className="form-control" readOnly />
              <ErrorMessage name="barcode" component="div" className="text-danger" />
            </div>

            <div className="mb-3 col-md-4">
              <label className="form-label">Nombre</label>
              <Field name="name" className="form-control" readOnly />
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
