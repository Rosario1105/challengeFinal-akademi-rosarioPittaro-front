import React, { useState } from 'react';
import {
  Card,
  Input,
  Button,
  Typography,
} from '@material-tailwind/react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Error al enviar el correo');
      }

      setMessage('Revisa tu correo para restablecer la contraseña');
      setError('');
    } catch (err) {
      setError(err.message);
      setMessage('');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card color="white" shadow={true} className="p-8 w-96">
        <Typography variant="h4" color="blue-gray" className="text-center">
          Recuperar Contraseña
        </Typography>

        <form onSubmit={handleSubmit} className="mt-8 mb-2 w-full">
          <div className="mb-4">
            <Input
              label="Correo electrónico"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          {message && (
            <Typography color="green" className="text-sm text-center mb-2">
              {message}
            </Typography>
          )}
          {error && (
            <Typography color="red" className="text-sm text-center mb-2">
              {error}
            </Typography>
          )}

          <Button type="submit" className="mt-4" fullWidth variant="outlined">
            Enviar enlace
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ForgotPassword;
