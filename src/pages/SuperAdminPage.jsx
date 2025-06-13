import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Card, CardBody } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import TablaDinamica from "../components/tablaDinam";
import ModalUsuario from "../components/editarUsuarioMod";
import {
  listUsers,
  deleteUserById,
  createUser,
  updateUser,
} from "../redux/actions/userActions";
import BotonSalir from "../components/buttonSalir";

function SuperAdminPage() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  const handleEdit = (user) => {
    setEditingUser(user);
    setModalVisible(true);
  };

  const handleDelete = (userId) => {
    if (window.confirm("¿Seguro que querés eliminar este usuario?")) {
      dispatch(deleteUserById(userId));
    }
  };

  const handleCreate = () => {
    setEditingUser(null);
    setModalVisible(true);
  };

  const handleSave = (formData) => {
    if (editingUser) {
      dispatch(updateUser(editingUser._id || editingUser.id, formData));
    } else {
      dispatch(createUser(formData));
    }
    setModalVisible(false);
  };

  const columnas = [
    { key: "name", label: "Nombre" },
    { key: "email", label: "Email" },
    { key: "role", label: "Rol" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Typography variant="h3" className="mb-4 text-center text-blue-700">
        Gestión de Usuarios
      </Typography>

      <div className="flex justify-center mb-6">
        <Link
          to="/estadisticas"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Ver Estadísticas del Sistema
        </Link>
      </div>

      {loading && <p>Cargando usuarios...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <Card className="shadow-lg">
          <CardBody>
            <TablaDinamica
              data={users}
              columnas={columnas}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onCreate={handleCreate}
              showSearch={true}
              showFilter={true}
              filterField="role"
              filterOptions={["alumno", "profesor", "superadmin"]}
              title="Usuarios del sistema"
            />
          </CardBody>
        </Card>
      )}

      {modalVisible && (
        <ModalUsuario
          user={editingUser}
          onClose={() => setModalVisible(false)}
          onSave={handleSave}
        />
      )}

      <BotonSalir />
    </div>
  );
}

export default SuperAdminPage;
