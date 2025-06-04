import React, { useState } from 'react';
import AlumnosDelProfesor from '../components/alumnos';
import CrearCurso from '../components/curso';
import CursosDelProfesor from './CursosProfPage';
const ProfesorPage = () => {
  const [tab, setTab] = useState('alumnos');

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
        {tab === 'alumnos' && <AlumnosDelProfesor />}
        {tab === 'crear' && <CrearCurso />}
        {tab === 'cursos' && <CursosDelProfesor />}
      </div>
    </div>
  );
};

export default ProfesorPage;
