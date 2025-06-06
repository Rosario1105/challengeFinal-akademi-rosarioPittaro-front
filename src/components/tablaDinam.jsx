import React, { useState, useMemo } from "react";
const TablaDinamica = ({
  data = [],
  columnas = [],
  onEdit,
  onDelete,
  onCreate,
  showSearch = false,
  showFilter = false,
  filterField = "role",
  filterOptions = [],
  title,
  rowsPerPageOptions = [5, 10, 20],
  defaultRowsPerPage = 6,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  const filteredData = useMemo(() => {
    let filtered = Array.isArray(data) ? [...data] : [];

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

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];

        if (valA == null) return 1;
        if (valB == null) return -1;

        if (typeof valA === "number" && typeof valB === "number") {
          return sortConfig.direction === "asc" ? valA - valB : valB - valA;
        }

        return sortConfig.direction === "asc"
          ? valA.toString().localeCompare(valB.toString())
          : valB.toString().localeCompare(valA.toString());
      });
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
    sortConfig,
  ]);

  const totalRows = filteredData.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const currentData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, currentPage, rowsPerPage]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterValue, rowsPerPage]);

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
              <th
                key={col.key}
                className="border px-4 py-2 text-left cursor-pointer select-none"
                onClick={() => col.sortable && handleSort(col.key)}
              >
                {col.label}
                {col.sortable && sortConfig.key === col.key && (
                  <span className="ml-1">
                    {sortConfig.direction === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
            ))}
            {(onEdit || onDelete) && <th className="border px-4 py-2">Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {currentData.length === 0 ? (
            <tr>
              <td colSpan={columnas.length + 1} className="text-center py-4">
                No hay datos para mostrar
              </td>
            </tr>
          ) : (
            currentData.map((item, index) => (
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

      {/* Controles de paginación */}
      <div className="flex items-center justify-between mt-4">
        <div>
          <label>
            Mostrar{" "}
            <select
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              className="border px-2 py-1 rounded"
            >
              {rowsPerPageOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>{" "}
            filas
          </label>
        </div>

        <div className="space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className={`px-3 py-1 rounded border ${
              currentPage === 1
                ? "text-gray-400 border-gray-300 cursor-not-allowed"
                : "text-blue-600 border-blue-600 hover:bg-blue-100"
            }`}
          >
            Anterior
          </button>

          <span>
            Página {currentPage} de {totalPages || 1}
          </span>

          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() =>
              setCurrentPage((p) => Math.min(p + 1, totalPages || 1))
            }
            className={`px-3 py-1 rounded border ${
              currentPage === totalPages || totalPages === 0
                ? "text-gray-400 border-gray-300 cursor-not-allowed"
                : "text-blue-600 border-blue-600 hover:bg-blue-100"
            }`}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default TablaDinamica;
