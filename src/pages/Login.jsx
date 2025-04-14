import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import logo from '../assets/navarro-pos-logo.png';
import { useAuthStore } from '../store/store';
import { buildUrl, API_URLS } from '../config/apiConfig'; // Importa la configuración
import { useNavigate } from 'react-router-dom';
// Esquema de validación con Yup
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Email inválido').required('El email es obligatorio'),
  password: Yup.string().min(6, 'Mínimo 6 caracteres').required('La contraseña es obligatoria'),
});

function Login() {
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate(); 
  const handleLogin = async (values) => {
    const { email, password } = values;

    try {
      const response = await axios.post(buildUrl(API_URLS.auth), { email, password });

      // Si la respuesta es exitosa, guardamos el token
      setToken(response.data.token);
      navigate('/sale'); // 👈 Redirige después de login exitoso
      console.log('Login exitoso');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('Error: ', error.response?.data?.message || 'Credenciales incorrectas');
      } else {
        console.log('Hubo un problema con el servidor:', error);
      }
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 mx-auto">
          <div className="card p-4 shadow w-100">
            <div className="text-center mb-4">
              <img
                src={logo}
                alt="Logo"
                className="img-fluid"
                style={{ maxHeight: '200px' }}
              />
            </div>

            <Formik
              initialValues={{ email: 'muqui@hotmail.com', password: '123456' }}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange('email')}
                      onBlur={handleBlur('email')}
                      className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                    />
                    {touched.email && errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange('password')}
                      onBlur={handleBlur('password')}
                      className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                    />
                    {touched.password && errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>

                  <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-warning col-12 col-lg-4">
                      Iniciar Sesión
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
