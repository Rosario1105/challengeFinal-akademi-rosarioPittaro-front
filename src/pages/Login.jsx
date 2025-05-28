import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:8000/api/auth/login', form);

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      const role = res.data.user.role;
      if (role === 'alumno') navigate('/alumno');
      else if (role === 'profesor') navigate('/profesor');
      else if (role === 'superadmin') navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="email" type="email" placeholder="Correo electrónico" value={form.email} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} className="w-full p-2 border rounded" required />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default Login;
