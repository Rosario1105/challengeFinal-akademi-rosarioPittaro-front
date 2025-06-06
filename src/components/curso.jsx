import React, { useState } from "react";
import axios from "axios";

const FormCurso = ({ cursoInicial = null, onSuccess, onClose }) => {
  const [form, setForm] = useState({
    title: cursoInicial?.title || "",
    description: cursoInicial?.description || "",
    category: cursoInicial?.category || "",
    level: cursoInicial?.level || "",
    price: cursoInicial?.price || "",
    capacity: cursoInicial?.capacity || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const isEditar = Boolean(cursoInicial);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem("token");
      if (isEditar) {
        await axios.put(
          `http://localhost:8000/api/courses/${cursoInicial._id}`,
          form,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSuccess("Curso actualizado exitosamente");
      } else {
        await axios.post("http://localhost:8000/api/courses", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSuccess("Curso creado exitosamente");
        setForm({
          title: "",
          description: "",
          category: "",
          level: "",
          price: "",
          capacity: "",
        });
      }
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (err) {
      setError(
        err.response?.data?.msg ||
          (isEditar ? "Error al actualizar curso" : "Error al crear curso")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">
        {isEditar ? "Editar curso" : "Crear nuevo curso"}
      </h2>
      {error && <div className="mb-2 text-red-600">{error}</div>}
      {success && <div className="mb-2 text-green-600">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium" htmlFor="title">
            Título
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="description">
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="category">
            Categoría
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="level">
            Nivel
          </label>
          <select
            id="level"
            name="level"
            value={form.level}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Seleccione un nivel</option>
            <option value="Basico">Basico</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Avanzado">Avanzado</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="price">
            Precio
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="capacity">
            Capacidad
          </label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={form.capacity}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading
            ? isEditar
              ? "Actualizando..."
              : "Creando..."
            : isEditar
            ? "Actualizar Curso"
            : "Crear Curso"}
        </button>
      </form>
    </div>
  );
};

export default FormCurso;
