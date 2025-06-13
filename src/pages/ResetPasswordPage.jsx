import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("ResetPasswordPage montado. Token:", token);
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8000/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error al resetear la contraseña");
      }

      setMessage("Contraseña actualizada correctamente. Serás redirigido al login.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Restablecer contraseña</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div>
          <label style={{ display: "block", marginBottom: 4 }}>Nueva contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: 4 }}>Confirmar contraseña</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <button type="submit" style={{ padding: "8px 12px", cursor: "pointer" }}>
          Actualizar contraseña
        </button>
      </form>

      {message && <p style={{ color: "green", marginTop: 16 }}>{message}</p>}
      {error && <p style={{ color: "red", marginTop: 16 }}>{error}</p>}
    </div>
  );
}
