import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";

const CalificacionesPage = () => {
  const [calificaciones, setCalificaciones] = useState([]);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/qualitations/student/${user.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCalificaciones(res.data);
      } catch (err) {
        console.error("Error al obtener calificaciones:", err);
      }
    };

    if (user?.id) fetchNotas();
  }, [user, token]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Typography variant="h4" color="blue-gray" className="mb-6">
        Mis Calificaciones
      </Typography>

      {calificaciones.length === 0 ? (
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
                    <Typography variant="h6">
                      {nota.courseId.title}
                    </Typography>
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
    </div>
  );
};

export default CalificacionesPage;
