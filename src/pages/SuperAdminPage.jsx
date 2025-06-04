import { useEffect, useState } from "react";
import axios from 'axios';
import { 
    Card,
    CardBody,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Tabs,
    TabsHeader,
    Tab
} from "@material-tailwind/react";
import { UserGroupIcon, AcademicCapIcon } from "@heroicons/react/24/solid";



const SuperAdminPage = () => {
    const [usuarios, setUsuarios ] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [activeTab, setActiveTab] = useState('usuarios');

    const token = localStorage.getItem('token');

    useEffect(() =>{
        const fetchData = async () => {
            try{
                const usersRes = await axios.get("http://localhost:8000/api/users",{
                    headers: {Authorization: `Bearer ${token}`},
                });
                console.log('Usuarios:' , usersRes.data);
                
                const coursesRes = await axios.get("http://localhost:8000/api/courses", {
                    headers: {Authorization: `Bearer ${token}`},
                });
                setUsuarios(usersRes.data);
                setCursos(coursesRes.data);
            } catch (err){
                console.error('Error al cargar datos', err);
            }
        };
        fetchData();
    }, [token]);

 return (
    <div className="max-w-5xl mx-auto p-6">
      <Typography variant="h4" className="mb-6">
        Panel de Superadmin
      </Typography>

      <Tabs value={activeTab}>
        <TabsHeader>
          <Tab value="usuarios" onClick={() => setActiveTab("usuarios")}>
            Usuarios
          </Tab>
          <Tab value="cursos" onClick={() => setActiveTab("cursos")}>
            Cursos
          </Tab>
        </TabsHeader>

        {activeTab === "usuarios" && (
          <Card className="mt-6">
            <CardBody>
              <List>
                {usuarios.map((u) => (
                  <ListItem key={u._id}>
                    <ListItemPrefix>
                      <UserGroupIcon className="h-5 w-5 text-indigo-500" />
                    </ListItemPrefix>
                    <div>
                      <Typography variant="h6">{u.name}</Typography>
                      <Typography variant="small" color="gray">
                        Rol: {u.role} — Email: {u.email}
                      </Typography>
                    </div>
                  </ListItem>
                ))}
              </List>
            </CardBody>
          </Card>
        )}

        {activeTab === "cursos" && (
          <Card className="mt-6">
            <CardBody>
              <List>
                {cursos.map((c) => (
                  <ListItem key={c._id}>
                    <ListItemPrefix>
                      <AcademicCapIcon className="h-5 w-5 text-blue-500" />
                    </ListItemPrefix>
                    <div>
                      <Typography variant="h6">{c.title}</Typography>
                      <Typography variant="small" color="gray">
                        Profesor: {c.profesor?.name || "No asignado"}
                      </Typography>
                    </div>
                  </ListItem>
                ))}
              </List>
            </CardBody>
          </Card>
        )}
      </Tabs>
    </div>
  );
};

export default SuperAdminPage;