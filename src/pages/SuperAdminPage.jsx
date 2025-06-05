import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Card, CardBody } from '@material-tailwind/react';
import TablaDinamica from '../components/tablaDinam';
import ModalUsuario from '../components/editarUsuarioMod';
import { listUsers, deleteUserById, createUser, updateUser } from '../redux/actions/userActions';

function SuperAdminPage() {
      console.log('SuperAdminPage renderizado');

      const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  console.log('Users redux:', users);


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
    if (window.confirm('¿Seguro que querés eliminar este usuario?')) {
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
    { key: 'name', label: 'Nombre' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Rol' },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Typography variant="h3" className="mb-6 text-center text-blue-700">
        Gestión de Usuarios
      </Typography>

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
    </div>
  );
}

export default SuperAdminPage;