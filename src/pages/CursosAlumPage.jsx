import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

import DetalleCurso from "../components/detalleCurso";
const CursosAlumPage = () => {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
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
        setCursos(res.data);
      } catch (err) {
        console.error("Error al obtener cursos", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCursos();
  }, [navigate]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Mis Cursos</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-gray-600">Cargando cursos...</p>
        ) : cursos.length === 0 ? (
          <p className="text-gray-600">No estás inscripto en ningún curso.</p>
        ) : (
          cursos.map((insc) => (
            <Card key={insc._id} className="w-full shadow-lg">
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {insc.courseId.title}
                </Typography>
                <Typography>{insc.courseId.description}</Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Button
                  className="bg-pink-500 hover:bg-pink-600 text-white text-lg px-6 py-3 rounded-lg"
                  onClick={() => setCursoSeleccionado(insc.courseId._id)}
                >
                  Ver detalle
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

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
          cursoId={cursoSeleccionado}
          onClose={() => setCursoSeleccionado(null)}
        />
      )}
    </div>
  );
};

export default CursosAlumPage;
