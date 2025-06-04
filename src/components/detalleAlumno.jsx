import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DetalleAlumno = ({ alumno, onClose }) => {
  const [calificaciones, setCalificaciones] = useState([]);

  useEffect(() => {
    axios.get(`/api/qualitations/alumno/${alumno.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    }).then(res => setCalificaciones(res.data));
  }, [alumno]);

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-2">Detalle de {alumno.name}</h2>
      <p><strong>Email:</strong> {alumno.email}</p>
      <p><strong>DNI:</strong> {alumno.dni}</p>

      <h3 className="mt-4 font-semibold">Calificaciones:</h3>
      <ul>
        {calificaciones.map(q => (
          <li key={q._id}>
            {q.courseId.title}: {q.score} ({q.feedback})
          </li>
        ))}
      </ul>

      <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Cerrar
      </button>
    </div>
  );
};

export default DetalleAlumno;
