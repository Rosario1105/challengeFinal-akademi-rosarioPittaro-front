import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Button,
} from "@material-tailwind/react";
import { AcademicCapIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const CalificacionesPage = () => {
  const [calificaciones, setCalificaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (!user || user.role !== "alumno" || !token) {
      navigate("/login");
      return;
    }

    const fetchNotas = async () => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/qualitations/student/${user.id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (res.data && Array.isArray(res.data.data)) {
      setCalificaciones(res.data.data);
    } else {
      console.error("La respuesta de calificaciones no es un array:", res.data);
      setCalificaciones([]);
    }
  } catch (err) {
    console.error("Error al obtener calificaciones:", err);
    setCalificaciones([]);
  } finally {
    setLoading(false);
  }
};


    fetchNotas();
  }, [navigate]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Typography variant="h4" color="blue-gray" className="mb-6">
        Mis Calificaciones
      </Typography>

      {loading ? (
        <Typography color="gray">Cargando calificaciones...</Typography>
      ) : calificaciones.length === 0 ? (
        <Typography color="gray">No hay calificaciones aún.</Typography>
      ) : (
        <Card className="shadow-lg">
          <CardBody>
            <List>
             {calificaciones.map((nota) => (
  <ListItem key={nota._id}>
    <ListItemPrefix>
      <AcademicCapIcon className="h-5 w-5 text-blue-500" />
    </ListItemPrefix>
    <div>
      <Typography variant="h6">{nota.courseId?.title ?? "Curso no disponible"}</Typography>
      <Typography variant="small" color="gray">
        Nota: <strong>{nota.score}</strong>
        {nota.feedback && ` – ${nota.feedback}`}
      </Typography>
    </div>
  </ListItem>
))}

            </List>
          </CardBody>
        </Card>
      )}

      <div className="mt-4 ">
        <Button
          className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-6 py-3 rounded-lg"
          onClick={() => navigate("/alumno")}
        >
          Volver
        </Button>
      </div>
    </div>
  );
};

export default CalificacionesPage;
