import {use, useEffect, userEffect, useState } from 'react';
import axios from 'axios';

const Cursos = () => {
    const [cursos, setCursos] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    const inscribirse = async (courseId) => {
        try{
            await axios.post('http://localhost:8000/api/enrollments', {courseId} , {
                headers: {Authorization: `Bearer ${token}`}
            });
            alert('Inscripcion exitosa');
        } catch (err){
            alert(err.response?.data?.message || 'Error al inscribirse');
        }
    };

    useEffect(() => {
        const fetchCursos = async () => {
            const res = await axios.get('http://localhost:8000/api/courses',{
                headers: {Authorization: `Bearer ${token}`}
            });
            setCursos(res.data);
        };
        fetchCursos();
    }, [token]);
    return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Catálogo de Cursos</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        {cursos.map((curso) => (
          <div key={curso._id} className="p-4 border rounded-lg shadow">
            <h3 className="text-xl font-semibold">{curso.title}</h3>
            <p>{curso.description}</p>
            <p className="text-sm text-gray-500">Nivel: {curso.level}</p>
            <p className="text-sm text-gray-500">Profesor: {curso.profesor?.name}</p>
            <button
              onClick={() => inscribirse(curso._id)}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Inscribirme
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cursos;
