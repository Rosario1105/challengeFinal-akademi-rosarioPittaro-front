import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BotonSalir from "../components/buttonSalir";

const AlumnoPage = () => {
  const [alumno, setAlumno] = useState(null);
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (checked) return;

    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (!user || user.role !== "alumno") {
      navigate("/login", { replace: true });
    } else {
      setAlumno(user);
    }

    setChecked(true);
  }, [checked, navigate]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      {alumno && (
        <>
          <h1 className="text-3xl font-bold mb-4">Hola, {alumno.name} 👋</h1>
          <p className="mb-6 text-gray-600">Este es tu panel de alumno.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => navigate("/mis-cursos")}
              className="bg-blue-500 text-white py-3 px-4 rounded-lg shadow hover:bg-blue-600"
            >
              Mis Cursos
            </button>
            <button
              onClick={() => navigate("/mis-calificaciones")}
              className="bg-orange-500 text-white py-3 px-4 rounded-lg shadow hover:bg-orange-600"
            >
              Mis Calificaciones
            </button>

            <button
              className="bg-pink-500 hover:bg-pink-600 text-white text-lg px-6 py-3 rounded-lg "
              onClick={() => navigate("/cursos")}
            >
              Ver Catálogo de Cursos
            </button>
          </div>
            <BotonSalir/>
        </>
      )}
    </div>
  );
};

export default AlumnoPage;
