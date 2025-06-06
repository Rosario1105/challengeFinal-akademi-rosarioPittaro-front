
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from '../pages/Register';
import Login from '../pages/Login';
import AlumnoPage from '../pages/AlumnoPage';
import CursosAlumPage from '../pages/CursosAlumPage';
import MisCalificaciones from '../pages/CalificacionesPage';
import Cursos from '../pages/CursosPage';
import SuperAdminPage from '../pages/SuperAdminPage';
import PrivateRoute from '../components/privateRoute';
import ProfesorPage from '../pages/ProfesorPage';
import ForgotPassword from '../pages/ForgotPasswordPage';
import ResetPasswordPage from '../pages/resetPasswordPage';
export const frontRoutes = (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/alumno" element={<AlumnoPage />} />
    <Route path="/profesor" element={<ProfesorPage />} />
    <Route path="/mis-cursos" element={<CursosAlumPage />} />
    <Route path="/mis-calificaciones" element={<MisCalificaciones />} />
    <Route path="/cursos" element={<Cursos />} />
    <Route element={<PrivateRoute allowedRoles={['superadmin']} />}>
      <Route path="/admin" element={<SuperAdminPage />} />
    </Route>
    <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
  </Routes>
);
