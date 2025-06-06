import React, { useState, useMemo } from 'react';

const TablaDinamica = ({
  data,
  columnas,
  onEdit,
  onDelete,
  onCreate,
  showSearch = false,
  showFilter = false,
  title,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');

  const filteredData = useMemo(() => {
    let filtered = data;

    if (showFilter && filterRole) {
      filtered = filtered.filter(item => item.role === filterRole);
    }

    if (showSearch && searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        columnas.some(col => {
          const value = item[col.key];
          if (!value) return false;
          return value.toString().toLowerCase().includes(lowerSearch);
        })
      );
    }

    return filtered;
  }, [data, filterRole, searchTerm, columnas, showFilter, showSearch]);

  const roles = useMemo(() => {
  const rolesSet = new Set(data.map(u => u.role).filter(Boolean));
  return Array.from(rolesSet);
}, [data]);

{roles.map((role, index) => (
  <option key={`${role}-${index}`} value={role}>
    {role}
  </option>
))}


  return (
    <div>
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

      <div className="flex gap-4 mb-4">
        {showSearch && (
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        )}

        {showFilter && (
          <select
            value={filterRole}
            onChange={e => setFilterRole(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="">Todos los roles</option>
            {roles.map(role => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        )}

        {onCreate && (
          <button
            onClick={onCreate}
            className="ml-auto bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            Ingresar Profesor
          </button>
        )}
      </div>

      <table className="min-w-full border border-gray-300 rounded">
        <thead>
          <tr className="bg-gray-200">
            {columnas.map(col => (
              <th key={col.key} className="border px-4 py-2 text-left">
                {col.label}
              </th>
            ))}
            {(onEdit || onDelete) && <th className="border px-4 py-2">Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 && (
            <tr>
              <td colSpan={columnas.length + 1} className="text-center py-4">
                No hay datos para mostrar
              </td>
            </tr>
          )}

          {filteredData.map((item, index) => (
            <tr key={item._id || item.id || index} className="hover:bg-gray-100">
              {columnas.map(col => (
                <td key={col.key} className="border px-4 py-2">
                  {item[col.key]}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="border px-4 py-2 space-x-2">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(item)}
                      className="text-blue-600 hover:underline"
                    >
                      Editar
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => {
                        if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
                          onDelete(item._id || item.id);
                        }
                      }}
                      className="text-red-600 hover:underline"
                    >
                      Eliminar
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaDinamica;
