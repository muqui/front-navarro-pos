import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Esquema de validación
const DepartmentSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Muy corto")
    .max(50, "Muy largo")
    .required("El nombre es obligatorio"),
  description: Yup.string().max(255, "Máximo 255 caracteres"),
});

export const DepartmentForm = () => {
  const handleSubmit = (values, { resetForm }) => {
    console.log("Departamento creado:", values);
    // Aquí puedes enviar los datos a una API
    resetForm();
  };

  return (
    <div className="container mt-4">
      <h4>Crear Departamento</h4>

      <Formik
        initialValues={{ name: "", description: "" }}
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
