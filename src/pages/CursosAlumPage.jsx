import { useEffect, useState } from "react";
import axios from "axios";
import DetalleCurso from "../components/detalleCurso";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Input,
  Select,
  Option,
  CardFooter,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const Cursos = () => {
  const [cursos, setCursos] = useState([]);                
  const [filteredCursos, setFilteredCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [search, setSearch] = useState("");
  const [nivel, setNivel] = useState("todos");
  const [currentPage, setCurrentPage] = useState(1);
  const cursosPerPage = 6;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

 
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/courses", {
          headers: { Authorization: `Bearer ${token}` },
        });
       
        setCursos(res.data.data || []);
      } catch (err) {
        console.error("Error al cargar cursos", err);
      }
    };
    fetchCursos();
  }, [token]);

  
  useEffect(() => {
    let cursosFiltrados = cursos; 

    if (nivel !== "todos") {
      cursosFiltrados = cursosFiltrados.filter(
        (curso) => curso.level?.toLowerCase() === nivel
      );
    }

    if (search.trim() !== "") {
      cursosFiltrados = cursosFiltrados.filter((curso) =>
        curso.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredCursos(cursosFiltrados); 
    setCurrentPage(1);
  }, [search, nivel, cursos]);

  const indexOfLastCurso = currentPage * cursosPerPage;
  const indexOfFirstCurso = indexOfLastCurso - cursosPerPage;
  const currentCursos = filteredCursos.slice( 
    indexOfLastCurso
  );
  const totalPages = Math.ceil(filteredCursos.length / cursosPerPage);

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

  return (
    <Card className="p-4">
      <CardHeader floated={false} shadow={false} className="rounded-none pb-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <Typography variant="h5">Catálogo de Cursos</Typography>
            <Typography variant="small" className="text-gray-600">
              Explora los cursos disponibles e inscríbete
            </Typography>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Input
              label="Buscar curso"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Select
              label="Filtrar por nivel"
              value={nivel}
              onChange={(val) => setNivel(val)}
            >
              <Option value="todos">Todos</Option>
              <Option value="basico">Básico</Option>
              <Option value="intermedio">Intermedio</Option>
              <Option value="avanzado">Avanzado</Option>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardBody className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6">
        {currentCursos.map((curso) => (
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

      <CardFooter className="flex items-center justify-between border-t mt-4 pt-4">
        <Button
          variant="outlined"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Anterior
        </Button>
        <Typography variant="small">
          Página {currentPage} de {totalPages}
        </Typography>
        <Button
          variant="outlined"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Siguiente
        </Button>
      </CardFooter>

      <div className="mt-6 text-center">
        <Button
          className="bg-pink-500 hover:bg-pink-600 text-white text-lg px-6 py-3 rounded-lg"
          onClick={() => navigate("/alumno")}
        >
          Volver al menú
        </Button>
      </div>

      {cursoSeleccionado && (
        <DetalleCurso
          cursoId={cursoSeleccionado}
          onClose={() => setCursoSeleccionado(null)}
        />
      )}
    </Card>
  );
};

export default Cursos;
