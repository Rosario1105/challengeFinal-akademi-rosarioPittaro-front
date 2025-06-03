import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import AlumnoPage from './pages/AlumnoPage';
import CursosAlumPage from './pages/CursosAlumPage';
import MisCalificaciones from './pages/CalificacionesPage';
import Cursos from './pages/CursosPage';
function App() {
  return (
    <Routes>
      <Route path="/" element={<h1 className="text-center mt-10 text-2xl">Bienvenido a Akademi</h1>} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/alumno" element={<AlumnoPage />} /> 
      <Route path="/mis-cursos" element={<CursosAlumPage />} /> 
      <Route path="/mis-calificaciones" element={<MisCalificaciones />} /> 
      <Route path="/cursos" element={<Cursos />} /> 
    </Routes>
  );
}

export default App;
