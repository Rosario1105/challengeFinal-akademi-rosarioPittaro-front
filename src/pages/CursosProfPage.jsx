import { useEffect, useState } from "react";
import axios from "axios";
import TablaDinamica from "../components/TablaDinamica";

const ProfesorCursos = () => {
  const [cursos, setCursos] = useState([]);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/courses/professor/${user.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCursos(res.data);
      } catch (err) {
        console.error("Error al obtener cursos:", err);
      }
    };
    fetchCursos();
  }, [token, user]);

  const columns = [
    { key: "title", label: "Curso" },
    { key: "description", label: "Descripción" },
    {
      key: "studentsCount",
      label: "Inscriptos",
      render: (value, row) => row.students?.length || 0,
    },
  ];

  return (
    <TablaDinamica
      title="Mis Cursos"
      data={cursos}
      columns={columns}
      searchKeys={["title", "description"]}
    />
  );
};

export default ProfesorCursos;
