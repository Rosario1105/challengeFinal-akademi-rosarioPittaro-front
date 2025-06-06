import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";

const CalificacionesProfesorPage = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [nota, setNota] = useState("");
  const [feedback, setFeedback] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/enrollments/student-profesor",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAlumnos(res.data);
      } catch (err) {
        console.error("Error al cargar alumnos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAlumnos();
  }, []);

  const calificar = async (alumno) => {
    try {
      await axios.post(
        "http://localhost:8000/api/qualitations",
        {
          studentId: alumno.id,
          courseId: alumno.courseId,
          score: nota,
          feedback,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEditing(null);
      setNota("");
      setFeedback("");
      window.location.reload(); 
    } catch (err) {
      console.error(
        "Error al calificar:",
        err.response?.data?.msg || err.message
      );
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Typography variant="h4" className="mb-6">
        Calificaciones de mis alumnos
      </Typography>

      {loading ? (
        <Typography>Cargando alumnos...</Typography>
      ) : alumnos.length === 0 ? (
        <Typography>No hay alumnos inscriptos aún.</Typography>
      ) : (
        alumnos.map((alumno, index) => (
          <Card key={index} className="mb-4 shadow-lg">
            <CardBody>
              <Typography variant="h6">{alumno.name}</Typography>
              <Typography>Email: {alumno.email}</Typography>
              <Typography>DNI: {alumno.dni}</Typography>
              <Typography>Curso: {alumno.curso}</Typography>

              {editing === index ? (
                <div className="mt-4 space-y-2">
                  <Input
                    label="Nota"
                    value={nota}
                    onChange={(e) => setNota(e.target.value)}
                  />
                  <Input
                    label="Comentario"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                  <div className="flex gap-2 mt-2">
                    <Button onClick={() => calificar(alumno)} color="green">
                      Guardar
                    </Button>
                    <Button onClick={() => setEditing(null)} color="gray">
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  className="mt-4"
                  onClick={() => {
                    setEditing(index);
                    setNota("");
                    setFeedback("");
                  }}
                >
                  Calificar
                </Button>
              )}
            </CardBody>
          </Card>
        ))
      )}
    </div>
  );
};

export default CalificacionesProfesorPage;
