import React, { useEffect, useState } from "react";
import axios from "axios";
import TablaDinamica from "../components/tablaDinam";
import FormCurso from "../components/curso.jsx";
import CursosDelProfesor from "./CursosProfPage";
import DetalleAlumno from "../components/detalleAlumno";
import ModalCalificar from "../components/ModalCalifacion";
import BotonSalir from "../components/botonSalir.jsx";

const ProfesorPage = () => {
  const [tab, setTab] = useState("alumnos");
  const [alumnos, setAlumnos] = useState([]);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);
  const [alumnoParaCalificar, setAlumnoParaCalificar] = useState(null);

  const handleCalificar = (alumno) => setAlumnoParaCalificar(alumno);
  const cerrarModalCalificar = () => setAlumnoParaCalificar(null);
  const handleVerDetalle = (alumno) => setAlumnoSeleccionado(alumno);

  const handleEditar = (alumno) => {
    setAlumnoParaCalificar(alumno);
  };

  const handleEliminar = async (alumno) => {
    if (!alumno.qualId) {
      alert("No hay calificación para eliminar.");
      return;
    }

    if (
      !window.confirm(
        `¿Seguro que querés eliminar la calificación de ${alumno.name}?`
      )
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/qualitations/${alumno.qualId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Calificación eliminada correctamente.");
      recargarAlumnos();
    } catch (error) {
      console.error("Error al eliminar calificación:", error);
      alert("Error al eliminar la calificación.");
    }
  };

  const recargarAlumnos = async () => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.get("/api/enrollments/student-profesor", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAlumnos(data);
      cerrarModalCalificar();
    } catch (error) {
      console.error("Error al recargar alumnos:", error);
    }
  };

  useEffect(() => {
    recargarAlumnos();
  }, []);

  const tabStyle = (active) =>
    `px-4 py-2 text-sm font-semibold rounded-t-lg border-b-2 ${
      active
        ? "border-blue-500 text-blue-600"
        : "border-transparent text-gray-500 hover:text-blue-600"
    }`;

  return (
    <div className="p-6">
      <div className="flex space-x-4 border-b border-gray-200 mb-6">
        <BotonSalir />
        <button
          className={tabStyle(tab === "alumnos")}
          onClick={() => setTab("alumnos")}
        >
          Alumnos
        </button>
        <button
          className={tabStyle(tab === "crear")}
          onClick={() => setTab("crear")}
        >
          Crear Curso
        </button>
        <button
          className={tabStyle(tab === "cursos")}
          onClick={() => setTab("cursos")}
        >
          Mis Cursos
        </button>
      </div>

      {tab === "alumnos" && (
        <TablaDinamica
          data={alumnos}
          columnas={[
            { label: "Nombre", key: "name" },
            { label: "Email", key: "email" },
            { label: "Curso", key: "curso" },
            { label: "Nivel", key: "courseLevel" },
            {
              label: "Calificación",
              key: "score",
              render: (item) => (item.score != null ? item.score : "Sin nota"),
            },
            {
              label: "Acciones",
              key: "acciones",
              render: (item) => (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleVerDetalle(item)}
                    className="bg-pink-600 text-white px-2 py-1 rounded text-sm"
                  >
                    Ver detalle
                  </button>
                  {item.score != null && (
                    <>
                      <button
                        onClick={() => handleEditar(item)}
                        className="bg-orange-600 text-white px-2 py-1 rounded text-sm"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleEliminar(item)}
                        className="bg-red-600 text-white px-2 py-1 rounded text-sm"
                      >
                        Eliminar
                      </button>
                    </>
                  )}
                  {item.score == null && (
                    <button
                      onClick={() => handleCalificar(item)}
                      className="bg-green-600 text-white px-2 py-1 rounded text-sm"
                    >
                      Calificar
                    </button>
                  )}
                </div>
              ),
            },
          ]}
          showSearch
          showFilter
          filterField="courseLevel"
          filterOptions={["Basico", "Intermedio", "Avanzado"]}
          title="Listado de Alumnos"
        />
      )}

      {tab === "crear" && <FormCurso />}
      {tab === "cursos" && <CursosDelProfesor />}

      {alumnoSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <DetalleAlumno
            alumno={alumnoSeleccionado}
            onClose={() => setAlumnoSeleccionado(null)}
          />
        </div>
      )}

      {alumnoParaCalificar && (
        <ModalCalificar
          alumno={alumnoParaCalificar}
          onClose={cerrarModalCalificar}
          onSubmit={recargarAlumnos}
        />
      )}
    </div>
  );
};

export default ProfesorPage;
