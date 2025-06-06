import React, { useEffect, useState } from "react";
import axios from "axios";

const DetalleAlumno = ({ alumno, onClose }) => {
  const [calificaciones, setCalificaciones] = useState([]);
  const [editing, setEditing] = useState(null);
  const [score, setScore] = useState("");
  const [feedback, setFeedback] = useState("");
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    console.log("Alumno en detalle:", alumno);
    if (!alumno?.studentId) return;
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/qualitations/student/${alumno.studentId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCalificaciones(data);
      } catch (err) {
        console.error("Error al obtener calificaciones", err);
      }
    };

    fetchData();
  }, [alumno]);

  const handleEditClick = (cursoId) => {
    const existente = calificaciones.find((q) => q.courseId._id === cursoId);
    if (existente) {
      setScore(existente.score);
      setFeedback(existente.feedback || "");
    } else {
      setScore("");
      setFeedback("");
    }
    setEditing(cursoId);
  };

  const handleGuardar = async () => {
    if (score === "" || isNaN(score) || score < 0 || score > 100) {
      alert("La nota debe estar entre 0 y 100.");
      return;
    }

    try {
      setCargando(true);
      const token = localStorage.getItem("token");
      const body = {
        studentId: alumno.id,
        courseId: editing,
        score: Number(score),
        feedback,
      };

      await axios.put("/api/qualitations", body, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { data } = await axios.get(
        `/api/qualitations/student/${alumno.studentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCalificaciones(data);
      setEditing(null);
    } catch (err) {
      console.error("Error al guardar calificación", err);
      alert("Ocurrió un error al guardar la calificación.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-xl w-full">
      <h2 className="text-2xl font-bold mb-4">Detalle de {alumno.name}</h2>
      <p>
        <strong>Nombre:</strong> {alumno.name}
      </p>
      <p>
        <strong>Email:</strong> {alumno.email}
      </p>
      <p>
        <strong>Curso:</strong> {alumno.curso}
      </p>
      <p>
        <strong>Nivel:</strong> {alumno.courseLevel}
      </p>
      <p>
        <strong>Profesor:</strong> Tú
      </p>
      <p>
        <strong>Calificación:</strong>{" "}
        {alumno.score != null ? alumno.score : "Sin nota"}
      </p>
      <p>
        <strong>Feedback:</strong> {alumno.feedback || "Sin feedback"}
      </p>

      <div className="mt-4 flex justify-end">
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default DetalleAlumno;
