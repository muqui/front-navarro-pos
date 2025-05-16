import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
//import { buildUrl, API_URLS } from '../../config/apiConfig';
import { buildUrl, API_URLS } from '../config/apiConfig';
import axios from 'axios';
//import { useAuthStore } from '../store/auth'; 
import { useAuthStore } from '../store/auth'; 

export const UserForm = () => {
  const token = useAuthStore((state) => state.token);
    const formik = useFormik({
        initialValues: {
          email: '',
          name: '',
          password: '',
          address: '',
          phone: '',
          city: '',
          country: '',
          isAdmin: 'user',
          isActive: true, // Valor por defecto
        },
        validationSchema: Yup.object({
          email: Yup.string().email('Invalid email').required('Required'),
          name: Yup.string().required('Required'),
          password: Yup.string().min(6, 'Min 6 characters').required('Required'),
          address: Yup.string().required('Required'),
          phone: Yup.string().required('Required'),
          city: Yup.string().required('Required'),
          country: Yup.string().required('Required'),
          //isAdmin: Yup.string().oneOf(['User', 'Admin'], 'Invalid role').required('Required'),
        }),
        onSubmit: async (values) => {
          console.log('Submitted values:', values);
          try {
            const response = await axios.post(buildUrl(`${API_URLS.register}`), values, {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });
            console.log('Signup successful:', response.data);
            alert('User registered successfully!');
          } catch (error) {
            if (axios.isAxiosError(error)) {
              console.error('Axios error:', error.response?.data || error.message);
              alert('Signup failed: ' + (error.response?.data?.message || error.message));
            } else {
              console.error('Unexpected error:', error);
              alert('Unexpected error occurred');
            }
          }
        },
      });
    
      const fields = [
        ['email', 'Email', 'email'],
        ['name', 'Name', 'text'],
        ['password', 'Password', 'password'],
        ['address', 'Address', 'text'],
        ['phone', 'Phone', 'text'],
        ['city', 'City', 'text'],
        ['country', 'Country', 'text'],
        ['isAdmin', 'Role', 'text'], // puedes hacer un <select> si prefieres
      ];
  return (
    <div className="container my-5">
    <h2 className="mb-4">User Registration Form</h2>
    <form onSubmit={formik.handleSubmit}>
      <div className="row">
        {fields.map(([field, label, type]) => (
          <div className="col-md-4 mb-3" key={field}>
            <label htmlFor={field} className="form-label">
              {label}
            </label>

            {field === 'isAdmin' ? (
              <select
                id="isAdmin"
                name="isAdmin"
                value={formik.values.isAdmin}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-select"
              >
              
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="technician">Technician</option>
              </select>
            ) : (
              <input
                type={type}
                id={field}
                name={field}
                value={formik.values[field]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-control"
              />
            )}

            {formik.touched[field] && formik.errors[field] && (
              <div className="text-danger">{formik.errors[field]}</div>
            )}
          </div>
        ))}
      </div>
      <button type="submit" className="btn btn-primary mt-3">
        Submit
      </button>
    </form>
  </div>
  )
}
