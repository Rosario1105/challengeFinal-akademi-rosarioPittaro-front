import React, { useState, useEffect } from "react";
import axios from "axios";

const ModalCalificar = ({ alumno, onClose, onSubmit }) => {
  const [score, setScore] = useState(alumno.score ?? "");
  const [feedback, setFeedback] = useState(alumno.feedback ?? "");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const isUpdate = !!alumno.qualId;

  const handleGuardar = async () => {
    console.log("Alumno en POST:", alumno);

    if (!alumno.courseId) {
      setError("No se encontró el curso para este alumno");
      setLoading(false);
      return;
    }

    if (score === "" || score < 0 || score > 10) {
      setError("La calificación debe estar entre 0 y 10.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (isUpdate) {
        await axios.put(
          `/api/qualitations/${alumno.qualId}`,
          { score, feedback },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          "/api/qualitations",
          {
            studentId: alumno.studentId,
            courseId: alumno.courseId,
            score,
            feedback,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      onSubmit();
    } catch (err) {
      console.error(err);
      setError("Error al guardar la calificación");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-[400px]">
        <h2 className="text-lg font-semibold mb-4">
          {isUpdate ? "Editar calificación de" : "Calificar a"} {alumno.name}
        </h2>

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        <div className="mb-4">
          <label className="block mb-1 font-medium">Puntaje (0-10):</label>
          <input
            type="number"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            className="w-full border px-3 py-1 rounded"
            min={0}
            max={10}
            disabled={loading}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Feedback:</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full border px-3 py-1 rounded"
            disabled={loading}
            rows={4}
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            onClick={handleGuardar}
            className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCalificar;
