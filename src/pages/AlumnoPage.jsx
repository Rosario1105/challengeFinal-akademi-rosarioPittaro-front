import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AlumnoPage = () => {
  const [alumno, setAlumno] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'alumno') {
      navigate('/login');
    } else {
      setAlumno(user);
    }
  }, [navigate]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      {alumno && (
        <>
          <h1 className="text-3xl font-bold mb-4">Hola, {alumno.name} 👋</h1>
          <p className="mb-6 text-gray-600">Este es tu panel de alumno.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => navigate('/mis-cursos')}
              className="bg-blue-500 text-white py-3 px-4 rounded-lg shadow hover:bg-blue-600"
            >
              Mis Cursos
            </button>
            <button
              onClick={() => navigate('/mis-calificaciones')}
              className="bg-green-500 text-white py-3 px-4 rounded-lg shadow hover:bg-green-600"
            >
              Mis Calificaciones
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AlumnoPage;
