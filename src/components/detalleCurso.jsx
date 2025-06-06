import { useEffect, useState } from "react";
import axios from "axios";

const DetalleCurso = ({ cursoId, onClose }) => {
  const [curso, setCurso] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchCurso = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/cursos/${cursoId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCurso(res.data);
      } catch (error) {
        console.error("Error al cargar el curso", error);
      } finally {
        setLoading(false);
      }
    };

    if (cursoId) {
      fetchCurso();
    }
  }, [cursoId]);

  if (!cursoId) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full relative">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          ✕
        </button>

      {loading ? (
  <p>Cargando detalles del curso...</p>
) : curso ? (
  <>
    <h2 className="text-2xl font-bold mb-4">{curso.title}</h2>
    <p>{curso.description}</p>
    <p>Profesor: {curso.professorName || curso.professor?.name || "No disponible"}</p>
    <p>Duración: {curso.duration} horas</p>
  </>
) : (
  <p>No se pudo cargar la información del curso.</p>
)}

      </div>
    </div>
  );
};

export default DetalleCurso;
