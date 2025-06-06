import { useEffect, useState } from "react";
import axios from "axios";
import DetalleCurso from "../components/detalleCurso";
import TablaDinamica from "../components/tablaDinam";
const CursosDelProfesor = () => {
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const res = await axios.get("/api/courses/profesorId/List", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCursos(res.data);
      } catch (err) {
        console.error("Error al cargar cursos del profesor", err);
      }
    };
    fetchCursos();
  }, [token]);

  const columnas = [
    { key: "title", label: "Título", sortable: true },
    { key: "description", label: "Descripción", sortable: false },
    {
      key: "level",
      label: "Nivel",
      sortable: true,
      render: (curso) => curso.level || "Sin especificar",
    },
  ];

  return (
    <div className="p-4">
      <TablaDinamica
        data={cursos}
        columnas={columnas}
        showSearch={true}
        showFilter={true}
        filterField="level"
        filterOptions={["basico", "intermedio", "avanzado"]}
        title="Mis Cursos"
        onEdit={(curso) => setCursoSeleccionado(curso._id)}
        rowsPerPageOptions={[3, 6, 10]}
        defaultRowsPerPage={6}
      />

      {cursoSeleccionado && (
        <DetalleCurso
          cursoId={cursoSeleccionado}
          onClose={() => setCursoSeleccionado(null)}
        />
      )}
    </div>
  );
};

export default CursosDelProfesor;
