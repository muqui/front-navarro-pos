import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
//import { buildUrl, API_URLS } from '../../config/apiConfig';
import { buildUrl, API_URLS } from '../config/apiConfig';
import axios from 'axios';
//import { useAuthStore } from '../store/auth'; 
import { useAuthStore } from '../store/auth'; 

export const UserForm = ({ user }) => {
  const token = useAuthStore((state) => state.token);
    const formik = useFormik({
        initialValues: {
          email:  user?.email || '',
          name: user?.name || '',
      password: '', // Nunca rellenes contraseñas
      address: user?.address || '',
      phone: user?.phone || '',
      city: user?.city || '',
      country: user?.country || '',
      isAdmin: user?.isAdmin || 'user',
      isActive: user?.isActive ?? true,
        },
        enableReinitialize: true, // IMPORTANTE para recargar valores cuando el prop `user` cambie
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
          try {
            if (user) {
              // Actualizar usuario
              const response = await axios.patch(
                buildUrl(`${API_URLS.users}/${user.id}`),
                values,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              alert('User updated successfully!');
              console.log('Update response:', response.data);
            } else {
              // Crear nuevo usuario
              const response = await axios.post(buildUrl(API_URLS.register), values, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              alert('User registered successfully!');
              console.log('Signup response:', response.data);
            }
          } catch (error) {
            if (axios.isAxiosError(error)) {
              console.error('Axios error:', error.response?.data || error.message);
              alert('Operation failed: ' + (error.response?.data?.message || error.message));
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
      <h2 className="mb-4  text-center">{user ? 'Actualizar usuario' : 'Registrar usuario'}</h2>
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
          {user ? 'Update' : 'Register'}
        </button>
      </form>
    </div>
  )
}
