import { useEffect, useState } from "react";
import axios from "axios";
import DetalleCurso from "../components/detalleCurso";

const Cursos = () => {
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const inscribirse = async (courseId) => {
    try {
      await axios.post(
        "http://localhost:8000/api/enrollments",
        { courseId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Inscripción exitosa");
    } catch (err) {
      alert(err.response?.data?.message || "Error al inscribirse");
    }
  };

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/courses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCursos(res.data);
      } catch (err) {
        console.error("Error al cargar cursos", err);
      }
    };
    fetchCursos();
  }, [token]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Catálogo de Cursos</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {cursos.map((curso) => (
          <div
            key={curso._id}
            className="p-4 border rounded-lg shadow bg-white hover:shadow-lg cursor-pointer"
            onClick={() => setCursoSeleccionado(curso._id)}
          >
            <h3 className="text-xl font-semibold">{curso.title}</h3>
            <p className="text-gray-700">{curso.description}</p>
            <p className="text-sm text-gray-600">Nivel: {curso.level}</p>
            <p className="text-sm text-gray-600">
              Profesor: {curso.profesor?.name}
            </p>
            <div className="flex justify-between items-center mt-3">
              <span className="text-green-600 font-semibold">
                ${curso.price}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  inscribirse(curso._id);
                }}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
              >
                Inscribirme
              </button>
            </div>
          </div>
        ))}
      </div>

      {cursoSeleccionado && (
        <DetalleCurso
          cursoId={cursoSeleccionado}
          onClose={() => setCursoSeleccionado(null)}
        />
      )}
    </div>
  );
};

export default Cursos;
