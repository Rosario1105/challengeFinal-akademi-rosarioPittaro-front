import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AlumnoPage from "../pages/AlumnoPage";
import CursosAlumPage from "../pages/CursosAlumPage";
import MisCalificaciones from "../pages/CalificacionesPage";
import Cursos from "../pages/CursosPage";
import SuperAdminPage from "../pages/SuperAdminPage";
import PrivateRoute from "../components/privateRoute";
import ProfesorPage from "../pages/ProfesorPage";
import ForgotPassword from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/resetPasswordPage";
import EstadisticasPage from "../pages/EstadisticaPage";

export const frontRoutes = (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />

    <Route path="/alumno" element={<PrivateRoute allowedRoles={["alumno"]} />}>
      <Route index element={<AlumnoPage />} />
    </Route>

    <Route
      path="/profesor"
      element={<PrivateRoute allowedRoles={["profesor"]} />}
    >
      <Route index element={<ProfesorPage />} />
    </Route>

    <Route path="/mis-cursos" element={<CursosAlumPage />} />
    <Route path="/mis-calificaciones" element={<MisCalificaciones />} />
    <Route path="/cursos" element={<Cursos />} />

    <Route
      path="/admin"
      element={<PrivateRoute allowedRoles={["superadmin"]} />}
    >
      <Route index element={<SuperAdminPage />} />
    </Route>

    <Route
      path="/estadisticas"
      element={<PrivateRoute allowedRoles={["superadmin"]} />}
    >
      <Route index element={<EstadisticasPage />} />
    </Route>

    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
  </Routes>
);
