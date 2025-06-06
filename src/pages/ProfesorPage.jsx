import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TablaDinamica from '../components/tablaDinam';
import CrearCurso from '../components/curso';
import CursosDelProfesor from './CursosProfPage';
import DetalleAlumno from '../components/detalleAlumno';



const ProfesorPage = () => {
  const [tab, setTab] = useState('alumnos');
  const [alumnos, setAlumnos] = useState([]);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);

useEffect(() => {
  const fetchAlumnos = async () => {
    try {
      const token = localStorage.getItem('token');

      // Aquí haces la petición y destructurás data
      const { data } = await axios.get('/api/enrollments/student-profesor', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Ahora sí podés usar data dentro del try
      console.log('Alumnos recibidos:', data);

      setAlumnos(data);
    } catch (err) {
      console.error('Error al obtener alumnos del profesor', err);
    }
  };

  fetchAlumnos();
}, []);

const columnas = [
  { key: 'name', label: 'Nombre' },
  { key: 'curso', label: 'Curso' },
  { key: 'grade', label: 'Calificación' },
];

const handleEdit = (alumno) => {
  setAlumnoSeleccionado(alumno);
};


const handleDelete = (enrollmentId) => {
  if (window.confirm('¿Estás seguro de eliminar este alumno?')) {
    setAlumnos(prev => prev.filter(a => a.enrollmentId !== enrollmentId));
  }
};

 

  const tabStyle = (active) =>
    `px-4 py-2 text-sm font-semibold rounded-t-lg border-b-2 ${
      active ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-blue-600'
    }`;

  return (
    <div className="p-6">
      <div className="flex space-x-4 border-b border-gray-200 mb-6">
        <button className={tabStyle(tab === 'alumnos')} onClick={() => setTab('alumnos')}>
          Alumnos
        </button>
        <button className={tabStyle(tab === 'crear')} onClick={() => setTab('crear')}>
          Crear Curso
        </button>
        <button className={tabStyle(tab === 'cursos')} onClick={() => setTab('cursos')}>
          Mis Cursos
        </button>
      </div>

      <div>
        {tab === 'alumnos' && (
          <TablaDinamica
            data={alumnos}
            columnas={columnas}
            onEdit={handleEdit}
            onDelete={handleDelete}
            showSearch={true}
            showFilter={true}
            title="Alumnos del Profesor"
          />
        )}
        {tab === 'crear' && <CrearCurso />}
        {tab === 'cursos' && <CursosDelProfesor />}
        {alumnoSeleccionado && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <DetalleAlumno
      alumno={alumnoSeleccionado}
      onClose={() => setAlumnoSeleccionado(null)}
    />
  </div>
)}

      </div>
    </div>
  );
};

export default ProfesorPage;
