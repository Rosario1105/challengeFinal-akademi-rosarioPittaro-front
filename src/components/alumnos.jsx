import React, { useEffect, useState } from 'react';
import TablaDinamica from './tablaDinam';
import axios from 'axios';
import DetalleAlumno from './DetalleAlumno'; 

const AlumnosDelProfesor = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);

 useEffect(() => {
  axios
    .get('/api/enrollments/alumnos-profesor', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(res => {
      console.log('Respuesta del backend:', res.data);

      const responseData = Array.isArray(res.data)
        ? res.data
        : res.data.alumnos || res.data.data || [];

      setAlumnos(responseData);
    });
}, []);


  const handleClickAlumno = (alumno) => {
    setAlumnoSeleccionado(alumno);
  };

  return (
    <>
      <TablaDinamica
        data={alumnos}
        columnas={[
          { key: 'name', label: 'Nombre' },
          { key: 'dni', label: 'DNI' },
          { key: 'email', label: 'Correo' },
          { key: 'curso', label: 'Curso' },
        ]}
        title="Alumnos asignados"
        onRowClick={handleClickAlumno}
        showSearch
      />

      {alumnoSeleccionado && (
        <DetalleAlumno alumno={alumnoSeleccionado} onClose={() => setAlumnoSeleccionado(null)} />
      )}
    </>
  );
};

export default AlumnosDelProfesor;
