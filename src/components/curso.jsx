import React, { useState } from "react";
import axios from "axios";

const CrearCurso = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    price: "",
    capacity: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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
    const res = await axios.post(
     "http://localhost:8000/api/courses",
      form,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setSuccess("Curso creado exitosamente");
    setForm({
      title: "",
      description: "",
      category: "",
      level: "",
      price: "",
      capacity: "",
    });
  } catch (err) {
    setError(err.response?.data?.msg || "Error al crear curso");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Crear nuevo curso</h2>
      {error && <div className="mb-2 text-red-600">{error}</div>}
      {success && <div className="mb-2 text-green-600">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium" htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="description">Descripción</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            rows="3"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="category">Categoría</label>
          <input
            type="text"
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="level">Nivel</label>
          <input
            type="text"
            id="level"
            name="level"
            value={form.level}
            onChange={handleChange}
            placeholder="Ejemplo: Básico, Intermedio, Avanzado"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="price">Precio</label>
          <input
            type="number"
            id="price"
            name="price"
            value={form.price}
            onChange={handleChange}
            min="0"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="capacity">Capacidad</label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={form.capacity}
            onChange={handleChange}
            min="1"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Creando..." : "Crear Curso"}
        </button>
      </form>
    </div>
  );
};

export default CrearCurso;
