import { useEffect, useState } from "react";
import axios from "axios";
import DetalleCurso from "../components/detalleCurso";
import {
  Card,
  CardHeader,
  Typography,
  Input,
  Button,
  CardBody,
  CardFooter,
  IconButton,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const Cursos = () => {
  const [cursos, setCursos] = useState([]);
  const [filteredCursos, setFilteredCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const cursosPerPage = 6;

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

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
      window.location.href = "/mis-cursos";
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
    if (res.data && Array.isArray(res.data.data)) {
      setCursos(res.data.data);
      setFilteredCursos(res.data.data);
    } else {
      console.error("La respuesta de cursos no es un array:", res.data);
      setCursos([]);
      setFilteredCursos([]);
    }
  } catch (err) {
    console.error("Error al cargar cursos", err);
    setCursos([]);
    setFilteredCursos([]);
  }
};

    fetchCursos();
  }, [token]);

  useEffect(() => {
    if (!Array.isArray(cursos)) return;

    const filtered = cursos.filter(
      (c) =>
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCursos(filtered);
    setCurrentPage(1); 
  }, [search, cursos]);

  const lastIndex = currentPage * cursosPerPage;
  const firstIndex = lastIndex - cursosPerPage;
  const currentCursos = Array.isArray(filteredCursos)
    ? filteredCursos.slice(firstIndex, lastIndex)
    : [];
  const totalPages = Math.ceil(
    (Array.isArray(filteredCursos) ? filteredCursos.length : 0) / cursosPerPage
  );

  return (
    <Card className="h-full w-full p-4">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <Typography variant="h4" color="blue-gray">
              Catálogo de Cursos
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Encuentra cursos disponibles e inscríbete fácilmente
            </Typography>
          </div>
          <div className="flex w-full gap-2 md:w-72">
            <Input
              label="Buscar curso"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>

      <CardBody className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {currentCursos.map((curso) => (
          <div
            key={curso._id}
            className="p-4 border rounded-lg shadow bg-white hover:shadow-lg cursor-pointer"
            onClick={() => setCursoSeleccionado(curso._id)}
          >
            <h3 className="text-xl font-semibold">{curso.title}</h3>
            <p className="text-gray-700">{curso.description}</p>
            <p className="text-sm text-gray-600">
              Nivel: {curso.level || "Sin especificar"}
            </p>
            <p className="text-sm text-gray-600">
              Profesor: {curso.profesor?.name || "Sin asignar"}
            </p>
            <div className="flex justify-between items-center mt-3">
              <span className="text-green-600 font-semibold">${curso.price}</span>
              <button
                onClick={async (e) => {
                  e.stopPropagation();
                  await inscribirse(curso._id);
                }}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
              >
                Inscribirme
              </button>
            </div>
          </div>
        ))}
      </CardBody>

      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button
          variant="outlined"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </Button>
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => (
            <IconButton
              key={i + 1}
              variant={currentPage === i + 1 ? "outlined" : "text"}
              size="sm"
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </IconButton>
          ))}
        </div>
        <Button
          variant="outlined"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </Button>
      </CardFooter>

      <div className="flex justify-center mt-6">
        <Button
          className="bg-pink-500 hover:bg-pink-600 text-white text-lg px-6 py-3 rounded-lg"
          onClick={() => navigate("/alumno")}
        >
          Volver al menú
        </Button>
      </div>

      {cursoSeleccionado && (
        <DetalleCurso cursoId={cursoSeleccionado} onClose={() => setCursoSeleccionado(null)} />
      )}
    </Card>
  );
};

export default Cursos;
