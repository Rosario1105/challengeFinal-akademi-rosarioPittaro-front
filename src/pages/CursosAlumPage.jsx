import { useEffect, useState } from "react"; 
import axios from "axios";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import DetalleCurso from "../components/detalleCurso";

const CursosAlumPage = () => {
  const [cursos, setCursos] = useState([]);
  const [filteredCursos, setFilteredCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [search, setSearch] = useState("");
  const [filterLevel, setFilterLevel] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const cursosPerPage = 6;

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (!user || !token || user.role !== "alumno") {
      navigate("/login");
      return;
    }

    const fetchCursos = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/enrollments/student/${user.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        let fetched;
        if (res.data.courses) {
          fetched = res.data.courses;
        } else if (Array.isArray(res.data)) {
          fetched = res.data;
        } else {
          fetched = [];
        }

        setCursos(fetched);
        setFilteredCursos(fetched);
      } catch (err) {
        console.error("Error al obtener cursos", err);
        setCursos([]);
        setFilteredCursos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCursos();
  }, [navigate]);

  
  useEffect(() => {
    let filtered = cursos;

    if (search.trim() !== "") {
      filtered = filtered.filter((insc) => {
        const title = insc.course?.title || insc.courseId?.title || "";
        return title.toLowerCase().includes(search.toLowerCase());
      });
    }

    if (filterLevel) {
      filtered = filtered.filter((insc) => {
        const level = insc.course?.level || insc.courseId?.level || "";
        return level.toLowerCase() === filterLevel.toLowerCase();
      });
    }

    setFilteredCursos(filtered);
    setCurrentPage(1); 
  }, [search, filterLevel, cursos]);

  const lastIndex = currentPage * cursosPerPage;
  const firstIndex = lastIndex - cursosPerPage;
  const currentCursos = filteredCursos.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredCursos.length / cursosPerPage);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Mis Cursos</h2>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <Input
          label="Buscar por título"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="md:w-1/2"
        />

        <Select
          label="Filtrar por nivel"
          value={filterLevel}
          onChange={(value) => setFilterLevel(value)}
          className="md:w-1/3"
        >
          <Option value="">Todos</Option>
          <Option value="basico">Básico</Option>
          <Option value="intermedio">Intermedio</Option>
          <Option value="avanzado">Avanzado</Option>
        </Select>
      </div>

      {loading ? (
        <p className="text-gray-600">Cargando cursos...</p>
      ) : filteredCursos.length === 0 ? (
        <p className="text-gray-600">No estás inscripto en ningún curso que coincida con los filtros.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentCursos.map((insc) => (
              <Card key={insc.enrollmentId || insc._id} className="w-full shadow-lg">
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    {insc.course?.title || insc.courseId?.title}
                  </Typography>
                  <Typography variant="small" color="gray" className="mb-1">
                    Nivel: {insc.course?.level || insc.courseId?.level || "Sin especificar"}
                  </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                  <Button
                    className="bg-pink-500 hover:bg-pink-600 text-white text-lg px-6 py-3 rounded-lg"
                    onClick={() =>
                      setCursoSeleccionado({
                        cursoId: insc.course?.id || insc.courseId?._id,
                        enrollmentId: insc.enrollmentId || insc._id,
                      })
                    }
                  >
                    Ver detalle
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outlined"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Anterior
            </Button>

            <span>
              Página {currentPage} de {totalPages}
            </span>

            <Button
              variant="outlined"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            >
              Siguiente
            </Button>
          </div>
        </>
      )}

      <div className="mt-10 flex gap-4">
        <Button
          className="bg-pink-500 hover:bg-pink-600 text-white text-lg px-6 py-3 rounded-lg"
          onClick={() => navigate("/alumno")}
        >
          Volver al menú
        </Button>
        <Button color="blue" onClick={() => navigate("/mis-calificaciones")}>
          Ver mis calificaciones
        </Button>
      </div>

      {cursoSeleccionado && (
        <DetalleCurso
          cursoId={cursoSeleccionado.cursoId}
          enrollmentId={cursoSeleccionado.enrollmentId}
          onClose={() => setCursoSeleccionado(null)}
        />
      )}
    </div>
  );
};

export default CursosAlumPage;
