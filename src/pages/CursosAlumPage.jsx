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

const CursosAlumPage = () => {
  const [cursos, setCursos] = useState([]);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCursos = async () => {
      try{
        const res = await axios.get(
          `http://localhost:8000/api/enrollments/student/${user.id}`,
          {
            headers: {Authorization: `Bearer ${token}`},
        }
        );
        setCursos(res.data);
      }catch(err){
        console.error("Error al obtener cursos", err);
      }
    };
    if(user?.id) fetchCursos();
  }, [user, token]);

  return(
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Mis Cursos</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cursos.length === 0 ? (
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
                <Button onClick={() => navigate(`/cursos/${insc.courseId._id}`)}>
                  Ver detalle
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      {/* Botones de navegación */}
      <div className="mt-10 flex gap-4">
        <Button color="gray" onClick={() => navigate('/alumno')}>
          Volver al menú de alumno
        </Button>
        <Button color="blue" onClick={() => navigate('/mis-calificaciones')}>
          Ver mis calificaciones
        </Button>
      </div>
    </div>
  );
};

export default CursosAlumPage;
