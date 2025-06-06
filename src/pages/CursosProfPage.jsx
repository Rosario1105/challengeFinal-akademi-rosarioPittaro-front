import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CursosDelProfesor = () => {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/courses/profesorId/List', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCursos(res.data);
      } catch (err) {
        setError('Error al cargar cursos');
      } finally {
        setLoading(false);
      }
    };
    fetchCursos();
  }, []);

  if (loading) return <p>Cargando cursos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cursos.length === 0 ? (
        <p>No tenés cursos creados aún.</p>
      ) : (
        cursos.map(curso => (
          <div key={curso._id} className="border rounded shadow p-4 bg-white">
            <h3 className="text-xl font-semibold mb-2">{curso.title}</h3>
            <p className="text-gray-700">{curso.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default CursosDelProfesor;
