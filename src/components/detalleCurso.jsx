import { useEffect, useState } from "react";
import axios from "axios";
import FormCurso from "../components/curso";
const DetalleCurso = ({ cursoId, onClose }) => {
  const [curso, setCurso] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditar, setShowEditar] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = localStorage.getItem("token");
  const rol = userInfo?.role || "alumno";

  const fetchCurso = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/courses/${cursoId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCurso(res.data);
    } catch (error) {
      console.error("Error al cargar el curso", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cursoId) fetchCurso();
  }, [cursoId]);

  const handleEliminar = async () => {
    const confirmar = window.confirm(
      "¿Estás seguro de que querés eliminar este curso?"
    );
    if (!confirmar) return;

    try {
      await axios.delete(`http://localhost:8000/api/courses/${curso._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Curso eliminado correctamente");
      onClose();
    } catch (error) {
      alert(error.response?.data?.message || "❌ Error al eliminar el curso");
    }
  };

  if (!cursoId) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-lg w-full relative overflow-y-auto max-h-[90vh]">
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
            showEditar ? (
              <FormCurso
                cursoInicial={curso}
                onClose={() => setShowEditar(false)}
                onSuccess={fetchCurso}
              />
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-2">{curso.title}</h2>
                <p className="mb-2">{curso.description}</p>
                <p className="mb-2">
                  Profesor:{" "}
                  {curso.professor?.name ||
                    curso.professorName ||
                    "No disponible"}
                </p>
                <p className="mb-1">Categoría: {curso.category}</p>
                <p className="mb-1">Nivel: {curso.level}</p>
                <p className="mb-1">Capacidad máxima: {curso.capacity}</p>
                <p className="mb-4">
                  Inscriptos:{" "}
                  {Array.isArray(curso.inscriptos)
                    ? curso.inscriptos.length
                    : curso.inscriptos}
                </p>

                {rol === "profesor" && (
                  <div className="mt-4 flex gap-4">
                    <button
                      onClick={() => setShowEditar(true)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={handleEliminar}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </>
            )
          ) : (
            <p>No se pudo cargar la información del curso.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DetalleCurso;
