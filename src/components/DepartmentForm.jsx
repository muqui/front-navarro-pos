import React, { useState } from "react"; // Asegúrate de importar useState
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { buildUrl, API_URLS } from '../config/apiConfig';
import { useAuthStore } from "../store/auth"; // Asegúrate de ajustar la ruta


// Esquema de validación
const DepartmentSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Muy corto")
    .max(50, "Muy largo")
    .required("El nombre es obligatorio"),
  
});

export const DepartmentForm = () => {
  const { token } = useAuthStore();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const handleSubmit = async (values, { resetForm }) => {
  
    setSuccess(false);
    setError('');

    try {
      const response = await axios.post(buildUrl(API_URLS.categories), {
        name: values.name.trim(), // ✅ Asegúrate de acceder correctamente
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201 || response.status === 200) {
        setSuccess(true);
        
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Error al registrar el departamento');
    }
    console.log("Departamento creado:", values);
    // Aquí puedes enviar los datos a una API
    resetForm();
  };

  return (
    <div className="container mt-4">
      <h4>Crear Departamento</h4>

      <Formik
       initialValues={{ name: "" }}
        validationSchema={DepartmentSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            {/* Nombre */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre</label>
              <Field name="name" className="form-control" />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>

         

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              Guardar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
