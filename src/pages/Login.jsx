import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/authActions';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Card,
  Input,
  Button,
  Typography,
} from '@material-tailwind/react';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, userInfo } = useSelector(state => state.auth);

  useEffect(() => {
    if (userInfo?.role) {
      let path = '/';
      switch (userInfo.role) {
        case 'alumno':
          path = '/alumno';
          break;
        case 'profesor':
          path = '/profesor';
          break;
        case 'superadmin':
          path = '/admin';
          break;
        default:
          path = '/';
      }
      if (location.pathname !== path) {
        navigate(path, { replace: true });
      }
    }
  }, [userInfo, location.pathname, navigate]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await dispatch(login(form.email, form.password));
    } catch (error) {}
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card color="white" shadow={true} className="p-8 w-96">
        <Typography variant="h4" color="blue-gray" className="text-center">
          Iniciar Sesión
        </Typography>

        <form onSubmit={handleSubmit} className="mt-8 mb-2 w-full">
          <div className="mb-4 flex flex-col gap-6">
            <Input
              name="email"
              label="Correo electrónico"
              size="lg"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Input
              name="password"
              label="Contraseña"
              type="password"
              size="lg"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && (
            <Typography color="red" className="text-sm text-center mt-2">
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            className="mt-6"
            fullWidth
            variant="outlined"
            disabled={loading}
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </Button>

          <Typography
            as={Link}
            to="/forgot-password"
            variant="small"
            color="blue"
            className="mt-4 text-center hover:underline block"
          >
            ¿Olvidaste tu contraseña?
          </Typography>
          <Typography
            as={Link}
            to="/register"
            variant="small"
            color="blue"
            className="mt-4 text-center hover:underline block"
          >
            Quieres ser alumno? Registrate
          </Typography>
        </form>
      </Card>
    </div>
  );
};

export default Login;
