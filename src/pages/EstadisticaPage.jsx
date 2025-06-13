import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Typography, Spinner, Alert } from '@material-tailwind/react';

const EstadisticasPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("/api/stats/overview", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStats(data);
      } catch (err) {
        setError("Error cargando estadísticas");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <Typography variant="h4" className="mb-6">Estadísticas del Sistema</Typography>

      {loading ? (
        <div className="flex justify-center">
          <Spinner color="blue" />
        </div>
      ) : error ? (
        <Alert color="red">{error}</Alert>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-4 text-center shadow-md">
            <Typography variant="h5">Cursos</Typography>
            <Typography variant="h2" color="blue">{stats.totalCursos}</Typography>
          </Card>
          <Card className="p-4 text-center shadow-md">
            <Typography variant="h5">Profesores</Typography>
            <Typography variant="h2" color="green">{stats.totalProfesores}</Typography>
          </Card>
          <Card className="p-4 text-center shadow-md">
            <Typography variant="h5">Alumnos Inscriptos</Typography>
            <Typography variant="h2" color="red">{stats.totalAlumnosInscriptos}</Typography>
          </Card>
        </div>
      )}
    </div>
  );
};

export default EstadisticasPage;
