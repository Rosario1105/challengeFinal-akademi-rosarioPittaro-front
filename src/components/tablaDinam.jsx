import React, { useState, useMemo } from "react";

const TablaDinamica = ({
  data,
  columnas,
  onEdit,
  onDelete,
  onCreate,
  showSearch = false,
  showFilter = false,
  filterField = "role",
  filterOptions = [],
  title,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const filteredData = useMemo(() => {
    let filtered = data;

    if (showFilter && filterValue) {
      filtered = filtered.filter((item) => item[filterField] === filterValue);
    }

    if (showSearch && searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter((item) =>
        columnas.some((col) => {
          const value = item[col.key];
          if (!value) return false;
          return value.toString().toLowerCase().includes(lowerSearch);
        })
      );
    }

    return filtered;
  }, [
    data,
    filterValue,
    searchTerm,
    columnas,
    showFilter,
    showSearch,
    filterField,
  ]);

  return (
    <div>
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

      <div className="flex flex-wrap gap-4 mb-4 items-center">
        {showSearch && (
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        )}

        {showFilter && (
          <select
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="">Todos</option>
            {filterOptions.map((opt, index) => (
              <option key={index} value={opt}>
                {opt}
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
            {columnas.map((col) => (
              <th key={col.key} className="border px-4 py-2 text-left">
                {col.label}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="border px-4 py-2">Acciones</th>
            )}
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan={columnas.length + 1} className="text-center py-4">
                No hay datos para mostrar
              </td>
            </tr>
          ) : (
            filteredData.map((item, index) => (
              <tr
                key={item._id || item.id || index}
                className="hover:bg-gray-100"
              >
                {columnas.map((col) => (
                  <td key={col.key} className="border px-4 py-2">
                    {col.render ? col.render(item) : item[col.key]}
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
                          if (
                            window.confirm(
                              "¿Estás seguro de eliminar este usuario?"
                            )
                          ) {
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
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TablaDinamica;
