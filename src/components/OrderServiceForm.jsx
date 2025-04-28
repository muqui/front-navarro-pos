import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const OrderServiceForm = () => {
  const formik = useFormik({
    initialValues: {
      service: '',
      client: '',
      cellphone: '',
      repairCost: '',
      paid: '',
      left: '',
      note: '',
      email: '',
      brand: '',
      model: '',
      issue: '',
      receivedCondition: '',
      passwordCellPhone: '',
      imei: '',
      date: '',
    },
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
      date: Yup.date().required('Required'),
    }),
    onSubmit: (values) => {
      console.log('Form values:', values);
    },
  });

  const fields = [
    ['service', 'Service'],
    ['client', 'Client'],
    ['cellphone', 'Cellphone'],
    ['repairCost', 'Repair Cost'],
    ['paid', 'Paid'],
    ['left', 'Left'],
    ['note', 'Note'],
    ['email', 'Email'],
    ['brand', 'Brand'],
    ['model', 'Model'],
    ['issue', 'Issue'],
    ['receivedCondition', 'Received Condition'],
    ['passwordCellPhone', 'Password'],
    ['imei', 'IMEI'],
  ];

  return (
    <div className="container my-5">
      <h2 className="mb-4">Orden de servicio</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          {fields.map(([field, label]) => (
            <div className="col-md-3 mb-3" key={field}>
              <label htmlFor={field} className="form-label">
                {label}
              </label>
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
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={formik.values.date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control"
            />
            {formik.touched.date && formik.errors.date && (
              <div className="text-danger">{formik.errors.date}</div>
            )}
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </div>
  );
};
